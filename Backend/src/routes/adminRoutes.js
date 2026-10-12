const { Router } = require("express");
const { login, me, changePassword } = require("../controllers/adminAuthController.js");
const { createRole, deleteRole, getPermissionCatalog, listRoles, updateRole } = require("../controllers/adminRolesController.js");
const { createAdminUser, deleteAdminUser, listAdminUsers, updateAdminUser } = require("../controllers/adminUsersController.js");
const {
  createResource, deleteResource, deleteMultipleResources,
  getResourceById, listResources, updateResource,
  uploadTeamPhoto, uploadBlogCoverImage,
} = require("../controllers/adminContentController.js");
const { getActivityLogs } = require("../controllers/adminActivityController.js");
const { requireAdmin, requireAnyPermission, requirePermission, requireResourcePermission } = require("../middleware/auth.js");
const { uploadPhoto, uploadBlogImage } = require("../middleware/upload.js");

const router = Router();

router.post("/auth/login", login);
router.get("/auth/me", requireAdmin, me);
router.post("/auth/change-password", requireAdmin, changePassword);

router.get("/permissions", requireAdmin, requirePermission("roles", "view"), getPermissionCatalog);

router.get("/roles", requireAdmin, requireAnyPermission([
  { area: "roles", action: "view" },
  { area: "admin-users", action: "view" },
  { area: "admin-users", action: "create" },
  { area: "admin-users", action: "edit" },
]), listRoles);
router.post("/roles", requireAdmin, requirePermission("roles", "create"), createRole);
router.patch("/roles/:id", requireAdmin, requirePermission("roles", "edit"), updateRole);
router.delete("/roles/:id", requireAdmin, requirePermission("roles", "delete"), deleteRole);

router.get("/users", requireAdmin, requirePermission("admin-users", "view"), listAdminUsers);
router.post("/users", requireAdmin, requirePermission("admin-users", "create"), createAdminUser);
router.patch("/users/:id", requireAdmin, requirePermission("admin-users", "edit"), updateAdminUser);
router.delete("/users/:id", requireAdmin, requirePermission("admin-users", "delete"), deleteAdminUser);

router.get("/activity-logs", requireAdmin, getActivityLogs);

router.post("/content/team-members/upload-photo", requireAdmin, requireResourcePermission("edit"), uploadPhoto.single("photo"), uploadTeamPhoto);
router.post("/content/blogs/upload-cover", requireAdmin, requireResourcePermission("edit"), uploadBlogImage.single("image"), uploadBlogCoverImage);
router.post("/content/:resource/bulk-delete", requireAdmin, requireResourcePermission("delete"), deleteMultipleResources);

router.get("/content/:resource", requireAdmin, requireResourcePermission("view"), listResources);
router.post("/content/:resource", requireAdmin, requireResourcePermission("create"), createResource);
router.get("/content/:resource/:id", requireAdmin, requireResourcePermission("view"), getResourceById);
router.patch("/content/:resource/:id", requireAdmin, requireResourcePermission("edit"), updateResource);
router.delete("/content/:resource/:id", requireAdmin, requireResourcePermission("delete"), deleteResource);

module.exports = router;
