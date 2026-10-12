/**
 * Central service for all public-facing API calls.
 * Uses VITE_API_BASE_URL from env — set this per environment.
 * Falls back to localhost:5000 only in local dev.
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function get(path) {
  const res = await fetch(`${API_BASE}${path}`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || json.error || "Request failed");
  }
  return json.data ?? json;
}

async function post(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || json.error || "Request failed");
  }
  return json.data ?? json;
}

async function postForm(path, formData) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    body: formData,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || json.error || "Request failed");
  }
  return json.data ?? json;
}

export const publicApi = {
  // Blogs
  listBlogCategories: () => get("/blog-categories"),
  listBlogs: (category) => get(category && category !== "all" ? `/blogs?category=${category}` : "/blogs"),
  getBlogBySlug: (slug) => get(`/blogs/${slug}`),

  // Team
  listTeamMembers: () => get("/team-members"),

  // Partners
  listPartners: () => get("/partners"),

  // Jobs
  listJobs: () => get("/jobs"),
  getJobById: (id) => get(`/jobs/${id}`),

  // Locations
  listDistricts: () => get("/districts"),

  // Submissions
  submitJobApplication: (formData) => postForm("/job-applications", formData),
  submitContact: (payload) => post("/contact-submissions", payload),
  submitBcAgentApplication: (payload) => post("/bc-agent-applications", payload),
};
