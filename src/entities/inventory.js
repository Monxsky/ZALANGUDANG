export const InventoryEntity = `
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) NOT NULL,
    warehouse_id INT NOT NULL,
    qty INT NOT NULL DEFAULT 0,
    qty_reserved INT NOT NULL DEFAULT 0,
    version INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
`;
