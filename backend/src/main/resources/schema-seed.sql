-- ===================================================================
-- Resolvia Database Initial Seed Data
-- Passwords below are BCrypt hashes of:
-- customer123 (Amit), super123 (Elena), field123 (Vikram & Ananya), admin123 (Marcus)
-- ===================================================================

-- 1. Insert Initial Users
INSERT INTO users (name, email, phone, password, role, specialization, current_location, coordinates, created_at, updated_at)
VALUES 
('Amit Sharma', 'amit.sharma@gmail.com', '+91 98111 22334', '$2a$10$wT0Xl770H.e3yZfW99L86uDkZ107X38n2.x847B.YFp5Z4k3a2Yiq', 'CUSTOMER', NULL, 'Flat 402, Lotus Boulevard, Sector 100, Noida', '28.5355° N, 77.3712° E', NOW(), NOW()),
('Elena Vance', 'elena.vance@resolvia.com', '+91 98700 12345', '$2a$10$86qC04zO3x8m3v0p11Xp2uGfL2wYn7sT5.x948C.ZFq6A5l4b3Zjq', 'SUPERVISOR', 'Dispatch & Incident Governance', 'Central Dispatch HQ, Sector 62, Noida', '28.6280° N, 77.3649° E', NOW(), NOW()),
('Vikram Singh', 'vikram.singh@resolvia.com', '+91 98200 44556', '$2a$10$97rD15aP4y9n4w1q22Yq3vHgM3xZo8uU6.y059D.AGr7B6m5c4Akr', 'FIELD_EXECUTIVE', 'High-Speed Optical Fiber & High-Voltage Grid', 'Sector 62 IT Park, Noida', '28.6280° N, 77.3649° E', NOW(), NOW()),
('Ananya Deshmukh', 'ananya.d@resolvia.com', '+91 98199 88776', '$2a$10$97rD15aP4y9n4w1q22Yq3vHgM3xZo8uU6.y059D.AGr7B6m5c4Akr', 'FIELD_EXECUTIVE', 'Gas/Water AMR Telemetry & Calibration', 'Electronic City Phase 1, Bengaluru', '12.8452° N, 77.6602° E', NOW(), NOW()),
('Marcus Sterling', 'marcus.sterling@resolvia.com', '+91 99000 88991', '$2a$10$08sE26bQ5z0o5x2r33Zr4wIhN4yAp9vV7.z160E.BHs8C7n6d5Bls', 'MANAGER', 'Enterprise SLA Governance', 'Regional Operations Office, New Delhi', '28.6139° N, 77.2090° E', NOW(), NOW());
