import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 5432),
});

interface RoutingResult {
  warehouse_id: number;
  allocated_qty: number;
}

export async function routeStock(sku: string, orderQty: number): Promise<RoutingResult[]> {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT warehouse_id, qty_available 
       FROM inventory 
       WHERE sku = $1 AND qty_available > 0 
       ORDER BY qty_available DESC`,
      [sku]
    );

    let remaining = orderQty;
    const allocation: RoutingResult[] = [];

    for (const row of rows) {
      if (remaining <= 0) break;
      const allocate = Math.min(row.qty_available, remaining);
      allocation.push({ warehouse_id: row.warehouse_id, allocated_qty: allocate });
      remaining -= allocate;
    }

    if (remaining > 0) {
      throw new Error(`Stok tidak cukup untuk SKU: ${sku}`);
    }

    return allocation;
  } finally {
    client.release();
  }
}
