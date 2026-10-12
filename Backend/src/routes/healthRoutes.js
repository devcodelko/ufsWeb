const { Router } = require("express");
const { healthCheck } = require("../controllers/healthController.js");

const router = Router();

router.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "ufs-digital-backend",
    message: "UFS Digital API is running",
    endpoints: {
      health: "/api/health",
      blogs: "/api/blogs",
      teamMembers: "/api/team-members",
      partners: "/api/partners",
      contactSubmissions: "/api/contact-submissions",
      bcAgentApplications: "/api/bc-agent-applications",
      adminLogin: "/api/admin/auth/login",
    },
  });
});

router.get("/health", healthCheck);

module.exports = router;
