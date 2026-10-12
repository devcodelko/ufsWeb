const { query } = require("../config/db.js");
const pool = require("../config/db.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { httpError } = require("../utils/httpError.js");
const { logActivity, buildDescription } = require("../utils/activityLogger.js");

const RESOURCES = {
  "blog-categories": { table: "blog_categories", fields: ["name", "slug", "display_order", "is_active"], orderBy: "display_order ASC, id ASC" },
  blogs: { table: "blogs", fields: ["title", "slug", "excerpt", "content", "cover_image_url", "tag", "category_id", "status", "published_at"], orderBy: "created_at DESC, id DESC" },
  "team-members": { table: "team_members", fields: ["name", "role", "experience_years", "bio", "photo_url", "linkedin_url", "display_order", "is_active"], orderBy: "display_order ASC, id ASC" },
  partners: { table: "partners", fields: ["name", "logo_url", "website_url", "display_order", "is_active"], orderBy: "display_order ASC, id ASC" },
  "contact-submissions": { table: "contact_submissions", fields: ["name", "email", "phone", "subject", "message", "status"], orderBy: "created_at DESC, id DESC" },
  "bc-agent-applications": { table: "bc_agent_applications", fields: ["full_name", "phone", "email", "pan_number", "aadhar_number", "bank_name", "state", "district", "city", "pincode", "address", "occupation", "experience", "message", "status"], orderBy: "created_at DESC, id DESC" },
  jobs: { table: "jobs", fields: ["title", "department", "status", "description", "location", "experience_required", "image_url"], orderBy: "created_at DESC" },
  "job-applications": { table: "job_applications", fields: ["job_id", "full_name", "email", "phone", "current_location", "experience_years", "current_ctc", "expected_ctc", "notice_period", "linkedin_url", "portfolio_url", "resume_url", "cover_letter", "status"], orderBy: "applied_at DESC" },
};

function getResource(name) {
  const resource = RESOURCES[name];
  if (!resource) throw httpError(404, "Admin resource not found");
  return resource;
}

function filterPayload(body, fields) {
  return Object.fromEntries(fields.filter((f) => Object.prototype.hasOwnProperty.call(body, f)).map((f) => [f, body[f]]));
}

function toAbsoluteAssetUrl(req, value) {
  if (!value || /^https?:\/\//i.test(value)) return value;
  const protocol = req.get("x-forwarded-proto") || req.protocol;
  const baseUrl = `${protocol}://${req.get("host")}`;
  return value.startsWith("/") ? `${baseUrl}${value}` : value;
}

const listResources = asyncHandler(async (req, res) => {
  const resourceName = req.params.resource;
  const resource = getResource(resourceName);
  const { job_id } = req.query;
  let sql, params = {};

  if (resourceName === "jobs") {
    sql = `SELECT j.*, COUNT(ja.id) as applications_count FROM jobs j LEFT JOIN job_applications ja ON ja.job_id = j.id GROUP BY j.id ORDER BY j.created_at DESC`;
  } else if (resourceName === "job-applications" && job_id) {
    sql = `SELECT * FROM job_applications WHERE job_id = :job_id ORDER BY applied_at DESC`;
    params.job_id = job_id;
  } else {
    sql = `SELECT * FROM ${resource.table} ORDER BY ${resource.orderBy}`;
  }

  const rows = await query(sql, params);
  const assetFields = ["cover_image_url", "photo_url", "logo_url", "image_url", "resume_url"];
  const data = rows.map((row) => {
    const newRow = { ...row };
    assetFields.forEach((field) => { if (newRow[field]) newRow[field] = toAbsoluteAssetUrl(req, newRow[field]); });
    return newRow;
  });
  res.json({ data });
});

const getResourceById = asyncHandler(async (req, res) => {
  const resource = getResource(req.params.resource);
  const rows = await query(`SELECT * FROM ${resource.table} WHERE id = :id LIMIT 1`, { id: req.params.id });
  if (!rows.length) throw httpError(404, "Record not found");
  const row = rows[0];
  ["cover_image_url", "photo_url", "logo_url", "image_url", "resume_url"].forEach((field) => { if (row[field]) row[field] = toAbsoluteAssetUrl(req, row[field]); });
  res.json({ data: row });
});

const createResource = asyncHandler(async (req, res) => {
  const resource = getResource(req.params.resource);
  const data = filterPayload(req.body, resource.fields);
  const fields = Object.keys(data);
  if (!fields.length) throw httpError(400, "No valid fields were provided");
  const columns = fields.join(", ");
  const placeholders = fields.map((f) => `:${f}`).join(", ");
  const result = await query(`INSERT INTO ${resource.table} (${columns}) VALUES (${placeholders})`, data);
  const detail = data.title || data.name || data.full_name || null;
  logActivity({ user: req.admin, action: "create", resource: req.params.resource, resourceId: result.insertId, description: buildDescription("create", req.params.resource, detail), metadata: { fields } });
  res.status(201).json({ data: { id: result.insertId } });
});

const updateResource = asyncHandler(async (req, res) => {
  const resource = getResource(req.params.resource);
  const resourceName = req.params.resource;
  const data = filterPayload(req.body, resource.fields);
  const fields = Object.keys(data);
  if (!fields.length) throw httpError(400, "No valid fields were provided");

  const existing = await query(`SELECT * FROM ${resource.table} WHERE id = :id LIMIT 1`, { id: req.params.id });
  const assignments = fields.map((f) => `${f} = :${f}`).join(", ");
  const result = await query(`UPDATE ${resource.table} SET ${assignments} WHERE id = :id`, { ...data, id: req.params.id });
  if (result.affectedRows === 0) throw httpError(404, "Record not found");

  const existingRow = existing[0] || {};
  const recordName = existingRow.title || existingRow.name || existingRow.full_name || `#${req.params.id}`;
  let description;
  if (Object.prototype.hasOwnProperty.call(data, "is_active") && fields.length === 1) {
    const state = data.is_active == 1 || data.is_active === true ? "Activated" : "Deactivated";
    const LABELS = { "team-members": "Team Member", partners: "Partner", "blog-categories": "Blog Category" };
    description = `${state} ${LABELS[resourceName] || resourceName}: "${recordName}"`;
  } else if (data.status && fields.length === 1) {
    description = `Changed status to "${data.status}" for ${recordName}`;
  } else {
    description = `Updated ${resourceName.replace(/-/g, " ")}: "${recordName}"`;
  }

  logActivity({ user: req.admin, action: "update", resource: resourceName, resourceId: req.params.id, description, metadata: { updatedFields: fields } });
  res.json({ data: { id: Number(req.params.id) } });
});

const deleteResource = asyncHandler(async (req, res) => {
  const resource = getResource(req.params.resource);
  const existing = await query(`SELECT * FROM ${resource.table} WHERE id = :id LIMIT 1`, { id: req.params.id });
  const existingRow = existing[0] || {};
  const recordName = existingRow.title || existingRow.name || existingRow.full_name || `#${req.params.id}`;
  const result = await query(`DELETE FROM ${resource.table} WHERE id = :id`, { id: req.params.id });
  if (result.affectedRows === 0) throw httpError(404, "Record not found");
  logActivity({ user: req.admin, action: "delete", resource: req.params.resource, resourceId: req.params.id, description: buildDescription("delete", req.params.resource, recordName) });
  res.status(204).send();
});

const deleteMultipleResources = asyncHandler(async (req, res) => {
  const resource = getResource(req.params.resource);
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) throw httpError(400, "Invalid or empty IDs list");
  const placeholders = ids.map(() => "?").join(", ");
  await pool.execute(`DELETE FROM ${resource.table} WHERE id IN (${placeholders})`, ids);
  logActivity({ user: req.admin, action: "delete", resource: req.params.resource, description: buildDescription("delete", req.params.resource) + ` (bulk: ${ids.length} records)`, metadata: { ids } });
  res.status(204).send();
});

const uploadTeamPhoto = asyncHandler(async (req, res) => {
  if (!req.file) throw httpError(400, "No photo file provided");
  const photoUrl = `/uploads/photos/${req.file.filename}`;
  res.json({ data: { photo_url: toAbsoluteAssetUrl(req, photoUrl) } });
});

const uploadBlogCoverImage = asyncHandler(async (req, res) => {
  if (!req.file) throw httpError(400, "No image file provided");
  const imageUrl = `/uploads/blogs/${req.file.filename}`;
  res.json({ data: { cover_image_url: toAbsoluteAssetUrl(req, imageUrl) } });
});

module.exports = { listResources, getResourceById, createResource, updateResource, deleteResource, deleteMultipleResources, uploadTeamPhoto, uploadBlogCoverImage };
