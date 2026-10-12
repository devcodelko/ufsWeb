-- ============================================================
-- UFS Digital — Full Database Setup (Production)
-- Run this once on Hostinger MySQL: u904723597_ufs_v2_db
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ── Roles ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS roles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) NOT NULL,
  description VARCHAR(500) NULL,
  is_system TINYINT(1) NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_roles_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO roles (name, slug, description, is_system, is_active) VALUES
  ('Super Admin', 'super_admin', 'Full access to every admin page and action.', 1, 1),
  ('Admin', 'admin', 'Default admin role with access to manage content, users and roles.', 1, 1)
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description);

-- ── Admin Users ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin', 'admin', 'editor') NOT NULL DEFAULT 'admin',
  role_id INT UNSIGNED NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Role Permissions ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS role_permissions (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  role_id INT UNSIGNED NOT NULL,
  area VARCHAR(80) NOT NULL,
  can_view TINYINT(1) NOT NULL DEFAULT 0,
  can_create TINYINT(1) NOT NULL DEFAULT 0,
  can_edit TINYINT(1) NOT NULL DEFAULT 0,
  can_delete TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_role_permissions_role_area (role_id, area)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO role_permissions (role_id, area, can_view, can_create, can_edit, can_delete)
SELECT r.id, p.area, 1, 1, 1, 1
FROM roles r
CROSS JOIN (
  SELECT 'dashboard' AS area UNION ALL
  SELECT 'blogs'             UNION ALL
  SELECT 'team-members'      UNION ALL
  SELECT 'partners'          UNION ALL
  SELECT 'contact-submissions' UNION ALL
  SELECT 'bc-agent-applications' UNION ALL
  SELECT 'admin-users'       UNION ALL
  SELECT 'roles'             UNION ALL
  SELECT 'jobs'              UNION ALL
  SELECT 'job-applications'
) p
WHERE r.slug IN ('super_admin', 'admin')
ON DUPLICATE KEY UPDATE area = VALUES(area);

-- ── Activity Logs ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_logs (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  user_name VARCHAR(120) NOT NULL,
  user_email VARCHAR(190) NOT NULL,
  user_role VARCHAR(80) NOT NULL,
  action ENUM('create', 'update', 'delete', 'login', 'change_password') NOT NULL,
  resource VARCHAR(100) NOT NULL,
  resource_id VARCHAR(40) NULL,
  description TEXT NOT NULL,
  metadata JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_activity_logs_user_id (user_id),
  KEY idx_activity_logs_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Blog Categories ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_categories (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blog_categories_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO blog_categories (name, slug, display_order, is_active) VALUES
  ('Account Services',  'account-services',  1, 1),
  ('Loans',             'loans',             2, 1),
  ('Payments',          'payments',          3, 1),
  ('Cards',             'cards',             4, 1),
  ('Digital Banking',   'digital-banking',   5, 1),
  ('Security',          'security',          6, 1),
  ('Personal Finance',  'personal-finance',  7, 1)
ON DUPLICATE KEY UPDATE name = VALUES(name), display_order = VALUES(display_order);

-- ── Blogs ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(240) NOT NULL,
  excerpt TEXT NULL,
  content LONGTEXT NULL,
  cover_image_url VARCHAR(600) NULL,
  tag VARCHAR(80) NULL,
  category_id INT UNSIGNED NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blogs_slug (slug),
  KEY idx_blogs_status_published_at (status, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Team Members ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  role VARCHAR(160) NOT NULL,
  experience_years INT NULL,
  bio TEXT NULL,
  photo_url VARCHAR(600) NULL,
  linkedin_url VARCHAR(600) NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_team_members_active_order (is_active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Partners ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  logo_url VARCHAR(600) NULL,
  website_url VARCHAR(600) NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_partners_active_order (is_active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO partners (name, logo_url, website_url, display_order, is_active)
SELECT 'Bank of Baroda', '/assets/partners/bob.jpg', NULL, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM partners WHERE name = 'Bank of Baroda');

INSERT INTO partners (name, logo_url, website_url, display_order, is_active)
SELECT 'UCO Bank', '/assets/partners/uco.jpg', NULL, 2, 1
WHERE NOT EXISTS (SELECT 1 FROM partners WHERE name = 'UCO Bank');

INSERT INTO partners (name, logo_url, website_url, display_order, is_active)
SELECT 'State Bank of India', '/assets/partners/sbi.jpg', NULL, 3, 1
WHERE NOT EXISTS (SELECT 1 FROM partners WHERE name = 'State Bank of India');

INSERT INTO partners (name, logo_url, website_url, display_order, is_active)
SELECT 'Baroda Gujarat Gramin Bank', '/assets/partners/bggb.jpg', NULL, 4, 1
WHERE NOT EXISTS (SELECT 1 FROM partners WHERE name = 'Baroda Gujarat Gramin Bank');

INSERT INTO partners (name, logo_url, website_url, display_order, is_active)
SELECT 'Punjab National Bank', '/assets/partners/pnb.jpg', NULL, 5, 1
WHERE NOT EXISTS (SELECT 1 FROM partners WHERE name = 'Punjab National Bank');

-- ── Contact Submissions ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(40) NULL,
  subject VARCHAR(220) NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'reviewed', 'archived') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contact_submissions_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Districts ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS districts (
  id INT NOT NULL AUTO_INCREMENT,
  state VARCHAR(30) NULL,
  district VARCHAR(26) NULL,
  status TINYINT(4) NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── BC Agent Applications ────────────────────────────────────
CREATE TABLE IF NOT EXISTS bc_agent_applications (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(190) NULL,
  pan_number VARCHAR(10) NULL,
  aadhar_number VARCHAR(12) NULL,
  bank_name VARCHAR(180) NULL,
  state VARCHAR(120) NULL,
  district VARCHAR(120) NULL,
  city VARCHAR(120) NULL,
  pincode VARCHAR(20) NULL,
  address VARCHAR(500) NULL,
  occupation VARCHAR(160) NULL,
  experience TEXT NULL,
  message TEXT NULL,
  status ENUM('new', 'contacted', 'approved', 'rejected', 'archived') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_bc_agent_applications_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Jobs ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  location VARCHAR(100) DEFAULT 'Remote',
  experience_required VARCHAR(100) NULL,
  image_url VARCHAR(600) NULL,
  description LONGTEXT NULL,
  status ENUM('draft', 'active', 'closed') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_jobs_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Job Applications ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_applications (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  job_id INT UNSIGNED NOT NULL,
  full_name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  current_location VARCHAR(160) NULL,
  experience_years INT NULL,
  current_ctc VARCHAR(100) NULL,
  expected_ctc VARCHAR(100) NULL,
  notice_period VARCHAR(100) NULL,
  linkedin_url VARCHAR(600) NULL,
  portfolio_url VARCHAR(600) NULL,
  resume_url VARCHAR(600) NULL,
  cover_letter TEXT NULL,
  status ENUM('new', 'reviewed', 'shortlisted', 'rejected') NOT NULL DEFAULT 'new',
  applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_applications_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  KEY idx_applications_job_id (job_id),
  KEY idx_applications_status_applied (status, applied_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
