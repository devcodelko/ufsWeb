const { Router } = require("express");
const {
  createBcAgentApplication,
  createContactSubmission,
  getBlogBySlug,
  listBlogCategories,
  listDistricts,
  listBlogs,
  listPartners,
  listTeamMembers,
  listJobs,
  getJobById,
  createJobApplication,
} = require("../controllers/publicController.js");
const { uploadResume } = require("../middleware/upload.js");

const router = Router();

router.get("/blog-categories", listBlogCategories);
router.get("/blogs", listBlogs);
router.get("/blogs/:slug", getBlogBySlug);
router.get("/team-members", listTeamMembers);
router.get("/partners", listPartners);
router.get("/districts", listDistricts);
router.get("/jobs", listJobs);
router.get("/jobs/:id", getJobById);
router.post("/job-applications", uploadResume.single("resume"), createJobApplication);
router.post("/contact-submissions", createContactSubmission);
router.post("/bc-agent-applications", createBcAgentApplication);

module.exports = router;
