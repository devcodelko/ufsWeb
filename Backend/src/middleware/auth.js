const jwt = require("jsonwebtoken");
const { query } = require("../config/db.js");
const { httpError } = require("../utils/httpError.js");

async function requireAdmin(req, res, next) {
  const header = req.get("authorization") || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(httpError(401, "Admin token is required"));
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
  } catch {
    return next(httpError(401, "Admin token is invalid or expired"));
  }

  try {
    const rows = await query(
      `SELECT au.id, au.name, au.email, au.role_id,
              r.slug AS role, r.name AS role_name, r.is_system AS role_is_system
       FROM admin_users au
       INNER JOIN roles r ON r.id = au.role_id
       WHERE au.id = :id AND au.is_active = 1 AND r.is_active = 1
       LIMIT 1`,
      { id: payload.id }
    );

    if (!rows.length) {
      return next(httpError(401, "Admin account is inactive"));
    }

    req.admin = rows[0];
    return next();
  } catch (err) {
    return next(err);
  }
}

function requirePermission(area, action = "view") {
  return async (req, res, next) => {
    try {
      if (req.admin?.role === "super_admin") return next();

      const column = `can_${action}`;
      const rows = await query(
        `SELECT ${column} AS allowed FROM role_permissions WHERE role_id = :roleId AND area = :area LIMIT 1`,
        { roleId: req.admin.role_id, area }
      );

      if (!rows.length || !rows[0].allowed) {
        return next(httpError(403, "You do not have permission to perform this action"));
      }
      return next();
    } catch (err) {
      return next(err);
    }
  };
}

function requireAnyPermission(checks = []) {
  return async (req, res, next) => {
    try {
      if (req.admin?.role === "super_admin") return next();

      for (const check of checks) {
        const column = `can_${check.action || "view"}`;
        const rows = await query(
          `SELECT ${column} AS allowed FROM role_permissions WHERE role_id = :roleId AND area = :area LIMIT 1`,
          { roleId: req.admin.role_id, area: check.area }
        );
        if (rows[0]?.allowed) return next();
      }

      return next(httpError(403, "You do not have permission to perform this action"));
    } catch (err) {
      return next(err);
    }
  };
}

function requireResourcePermission(action = "view") {
  return (req, res, next) => requirePermission(req.params.resource, action)(req, res, next);
}

module.exports = { requireAdmin, requirePermission, requireAnyPermission, requireResourcePermission };
