-- Seed warehouses
INSERT INTO warehouses (name, location) VALUES
('Gudang Jakarta', 'Jakarta Timur'),
('Gudang Surabaya', 'Surabaya Barat');

-- Seed inventory
INSERT INTO inventory (sku, warehouse_id, qty_available, qty_reserved) VALUES
('SKU-123', 1, 50, 0),
('SKU-123', 2, 30, 0),
('SKU-456', 1, 20, 0),
('SKU-456', 2, 15, 0);
