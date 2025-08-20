// src/services/transactions.js
const express = require("express");
const router = express.Router();
const db = require("./db");

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM transactions ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Create a new transaction
router.post("/", async (req, res) => {
  try {
    const { items } = req.body; // array of { productId, quantity, price, total }
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const transactionRes = await client.query(
        "INSERT INTO transactions(created_at) VALUES(NOW()) RETURNING id"
      );
      const transactionId = transactionRes.rows[0].id;

      const insertPromises = items.map(item =>
        client.query(
          "INSERT INTO transaction_items(transaction_id, product_id, quantity, price, total) VALUES($1,$2,$3,$4,$5)",
          [transactionId, item.productId, item.quantity, item.price, item.total]
        )
      );

      await Promise.all(insertPromises);
      await client.query("COMMIT");

      res.json({ message: "Transaction saved", transactionId });
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error saving transaction:", err);
    res.status(500).json({ error: "Failed to save transaction" });
  }
});

module.exports = router;
