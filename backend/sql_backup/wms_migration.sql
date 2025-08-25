
-- =========================================
-- WMS Database Migration
-- Tables: inventory, stock_movements, outbox
-- =========================================

-- 1. Inventory table
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) NOT NULL,
    warehouse_id INT NOT NULL,
    qty_on_hand INT NOT NULL DEFAULT 0,
    qty_reserved INT NOT NULL DEFAULT 0,
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- 2. Stock movements table
CREATE TABLE stock_movements (
    id SERIAL PRIMARY KEY,
    inventory_id INT NOT NULL REFERENCES inventory(id) ON DELETE CASCADE,
    movement_type VARCHAR(50) NOT NULL, -- e.g., sale, cancel, refund, manual_adjustment
    qty_change INT NOT NULL,
    ref_id VARCHAR(100), -- reference order ID or transaction ID
    note TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- 3. Outbox table
CREATE TABLE outbox (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, processing, done, failed
    retry_count INT NOT NULL DEFAULT 0,
    next_run_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Optional: Indexes for performance
CREATE INDEX idx_inventory_sku_warehouse ON inventory(sku, warehouse_id);
CREATE INDEX idx_outbox_status_next_run ON outbox(status, next_run_at);
CREATE INDEX idx_stock_movements_inventory ON stock_movements(inventory_id);

ALTER TABLE stock_movements
ADD COLUMN inventory_id INT;

-- Buat foreign key ke inventory.id
ALTER TABLE stock_movements
ADD CONSTRAINT fk_inventory
FOREIGN KEY (inventory_id) REFERENCES inventory(id)
ON DELETE CASCADE;

-- Index untuk performa
CREATE INDEX IF NOT EXISTS idx_stock_movements_inventory ON stock_movements(inventory_id);
