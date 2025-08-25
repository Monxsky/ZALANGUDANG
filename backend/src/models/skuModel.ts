import pool from "../db";

export interface SKU {
  id: number;
  name: string;
  code: string;
  stock: number;
  price: number;
}

export const getAllSKUs = async (): Promise<SKU[]> => {
  const res = await pool.query("SELECT * FROM skus ORDER BY id ASC");
  return res.rows;
};

export const createSKU = async (sku: Omit<SKU, "id">): Promise<SKU> => {
  const { name, code, stock, price } = sku;
  const res = await pool.query(
    "INSERT INTO skus (name, code, stock, price) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, code, stock, price]
  );
  return res.rows[0];
};

export const updateSKU = async (id: number, sku: Partial<SKU>): Promise<SKU> => {
  const fields = [];
  const values: any[] = [];
  let i = 1;

  for (const [key, value] of Object.entries(sku)) {
    fields.push(`${key} = $${i}`);
    values.push(value);
    i++;
  }

  const query = `UPDATE skus SET ${fields.join(", ")} WHERE id = $${i} RETURNING *`;
  values.push(id);

  const res = await pool.query(query, values);
  return res.rows[0];
};

export const deleteSKU = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM skus WHERE id = $1", [id]);
};
