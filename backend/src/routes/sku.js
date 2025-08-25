// backend/src/routes/sku.js
const express = require('express');
const router = express.Router();
const db = require('../services/db'); // <-- sesuai punyamu

// List + search + pagination
router.get('/', async (req, res) => {
  try {
    const { search = '', page = 1, limit = 20 } = req.query;
    const p = Math.max(parseInt(page) || 1, 1);
    const l = Math.min(Math.max(parseInt(limit) || 20, 1), 100);
    const offset = (p - 1) * l;

    const params = [];
    let where = '';
    if (search) {
      params.push(`%${search}%`, `%${search}%`);
      where = 'WHERE code ILIKE $1 OR name ILIKE $2';
    }

    const listSql = `
      SELECT id, code, name, category, stock, location, created_at, updated_at
      FROM skus ${where} ORDER BY id DESC LIMIT ${l} OFFSET ${offset}
    `;
    const countSql = `SELECT COUNT(*)::int AS total FROM skus ${where}`;

    const [list, count] = await Promise.all([
      db.query(listSql, params),
      db.query(countSql, params),
    ]);

    res.json({ data: list.rows, pagination: { page: p, limit: l, total: count.rows[0].total } });
  } catch (e) {
    console.error("Error in GET /api/sku:",e);
    res.status(500).json({ message: 'Failed to fetch SKUs', error: e.message });
  }
});

// Create
router.post('/', async (req, res) => {
  try {
    const { code, name, category = null, stock = 0, location = null } = req.body;
    if (!code || !name) return res.status(400).json({ message: 'code & name are required' });
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({ message: 'stock must be >= 0' });
    }
    const sql = `
      INSERT INTO skus(code, name, category, stock, location)
      VALUES($1,$2,$3,$4,$5)
      RETURNING id, code, name, category, stock, location, created_at, updated_at
    `;
    const { rows } = await db.query(sql, [code, name, category, stock, location]);
    res.status(201).json(rows[0]);
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ message: 'SKU code already exists' });
    console.error(e);
    res.status(500).json({ message: 'Failed to create SKU' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid id' });

    const { code, name, category = null, stock, location = null } = req.body;
    if (stock != null && (!Number.isInteger(Number(stock)) || Number(stock) < 0)) {
      return res.status(400).json({ message: 'stock must be >= 0' });
    }

    const fields = [];
    const values = [];
    let idx = 1;
    if (code != null) { fields.push(`code=$${idx++}`); values.push(code); }
    if (name != null) { fields.push(`name=$${idx++}`); values.push(name); }
    if (category !== undefined) { fields.push(`category=$${idx++}`); values.push(category); }
    if (stock !== undefined) { fields.push(`stock=$${idx++}`); values.push(Number(stock)); }
    if (location !== undefined) { fields.push(`location=$${idx++}`); values.push(location); }
    if (!fields.length) return res.status(400).json({ message: 'No fields to update' });

    const sql = `
      UPDATE skus SET ${fields.join(', ')}
      WHERE id=$${idx}
      RETURNING id, code, name, category, stock, location, created_at, updated_at
    `;
    values.push(id);
    const { rows } = await db.query(sql, values);
    if (!rows.length) return res.status(404).json({ message: 'SKU not found' });
    res.json(rows[0]);
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ message: 'SKU code already exists' });
    console.error(e);
    res.status(500).json({ message: 'Failed to update SKU' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid id' });

    const { rowCount } = await db.query('DELETE FROM skus WHERE id=$1', [id]);
    if (!rowCount) return res.status(404).json({ message: 'SKU not found' });
    res.status(204).send();
  } catch (e) {
    console.error("Error in GET /api/sku:",e);
    res.status(500).json({ message: 'Failed to delete SKU' });
  }
});

module.exports = router;
