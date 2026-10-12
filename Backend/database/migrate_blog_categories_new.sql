USE ufs_digital;

INSERT INTO blog_categories (name, slug, display_order, is_active) VALUES
  ('Account Services', 'account-services', 1, 1),
  ('Loans', 'loans', 2, 1),
  ('Payments', 'payments', 3, 1),
  ('Cards', 'cards', 4, 1),
  ('Digital Banking', 'digital-banking', 5, 1),
  ('Security', 'security', 6, 1),
  ('Personal Finance', 'personal-finance', 7, 1)
ON DUPLICATE KEY UPDATE name = VALUES(name), display_order = VALUES(display_order);
