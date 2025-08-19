import { pool } from '../config/db';

export async function revertStock(sku: string, qty: number, warehouse_id: number) {
  await pool.query(
    `UPDATE inventory
     SET qty_available = qty_available + $1
     WHERE sku=$2 AND warehouse_id=$3`,
    [qty, sku, warehouse_id]
  );

  await pool.query(
    `INSERT INTO stock_movements (sku, warehouse_id, change_type, qty_change)
     VALUES ($1,$2,'cancel',$3)`,
    [sku, warehouse_id, qty]
  );

  console.log(`Stock reverted for SKU=${sku} in warehouse=${warehouse_id}, QTY=${qty}`);
}
