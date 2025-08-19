export const StockMovementEntity = `
CREATE TABLE IF NOT EXISTS stock_movements (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) NOT NULL,
    warehouse_id INT NOT NULL,
    change_qty INT NOT NULL,
    reason VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
`;
