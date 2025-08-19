const express = require('express');
const router = express.Router();
const db = require('../services/db');

// GET all users
router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const result = await db.query(
            'SELECT id, username, email FROM users WHERE username ILIKE $1',
            [`%${search}%`]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

module.exports = router;
