require('dotenv').config();
const express = require('express');
const db = require('./services/db');
const usersRouter = require('./routes/users');
const cors = require('cors');
const morgan = require('morgan');
const skuRouter = require('./routes/sku');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/sku', skuRouter);

const transactionsRouter = require("./services/transactions");
app.use("/transactions", transactionsRouter);


app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'WMS Backend is running' });
});

app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, email FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    try {
        const client = await db.pool.connect();
        console.log('Connected to PostgreSQL');
        client.release();
    } catch (err) {
        console.error('Database connection error:', err);
    }
    console.log(`Server running on port ${PORT}`);
});
