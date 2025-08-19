import { pool } from '../../config/db.js';

export const saleOrder = async (sku, qty) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(`UPDATE inventory SET qty = qty - $1, version = version + 1 WHERE sku=$2`, [qty, sku]);
        await client.query(`INSERT INTO stock_movements(sku, warehouse_id, change_qty, reason) VALUES($1, 1, $2, 'sale')`, [sku, -qty]);
        await client.query(`INSERT INTO outbox_events(event_type, payload, warehouse_id) VALUES('sale', $1, 1)`, [JSON.stringify({ sku, qty })]);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
