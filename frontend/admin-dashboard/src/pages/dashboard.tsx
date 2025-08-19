import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock initial data
const initialProducts = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 150 },
];

const initialSKUs = [
  { id: 1, code: "Product A-SKU1", stock: 80, productId: 1 },
  { id: 2, code: "Product A-SKU2", stock: 60, productId: 1 },
  { id: 3, code: "Product B-SKU1", stock: 80, productId: 2 },
  { id: 4, code: "Product B-SKU2", stock: 60, productId: 2 },
];

const initialTransactions = [
  { id: 1, skuId: 1, quantity: 50, type: "IN", createdAt: new Date() },
  { id: 2, skuId: 2, quantity: 50, type: "IN", createdAt: new Date() },
  { id: 3, skuId: 1, quantity: 20, type: "OUT", createdAt: new Date() },
];

const Dashboard = () => {
  const [products, setProducts] = useState(initialProducts);
  const [skus, setSKUs] = useState(initialSKUs);
  const [transactions, setTransactions] = useState(initialTransactions);

  // Hitung chart data
  const chartData = skus.map((sku) => {
    const inQty = transactions
      .filter((t) => t.skuId === sku.id && t.type === "IN")
      .reduce((acc, t) => acc + t.quantity, 0);
    const outQty = transactions
      .filter((t) => t.skuId === sku.id && t.type === "OUT")
      .reduce((acc, t) => acc + t.quantity, 0);
    return {
      sku: sku.code,
      IN: inQty,
      OUT: outQty
    };
  });

  // Tambah transaksi baru
  const addTransaction = (skuId: number, quantity: number, type: "IN" | "OUT") => {
    const newTrans = {
      id: transactions.length + 1,
      skuId,
      quantity,
      type,
      createdAt: new Date()
    };
    setTransactions([newTrans, ...transactions]);

    // Update stock
    setSKUs(
      skus.map((sku) =>
        sku.id === skuId
          ? { ...sku, stock: type === "IN" ? sku.stock + quantity : sku.stock - quantity }
          : sku
      )
    );
  };

  // Delete transaksi
  const deleteTransaction = (id: number) => {
    const transToDelete = transactions.find((t) => t.id === id);
    if (!transToDelete) return;

    // Revert stock
    setSKUs(
      skus.map((sku) =>
        sku.id === transToDelete.skuId
          ? {
              ...sku,
              stock:
                transToDelete.type === "IN"
                  ? sku.stock - transToDelete.quantity
                  : sku.stock + transToDelete.quantity
            }
          : sku
      )
    );

    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>WMS Admin Dashboard</h1>

      {/* Summary */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: 1, padding: "10px", border: "1px solid #ccc" }}>
          <h2>Products</h2>
          <p>Total Products: {products.length}</p>
        </div>
        <div style={{ flex: 1, padding: "10px", border: "1px solid #ccc" }}>
          <h2>SKUs</h2>
          <p>Total SKUs: {skus.length}</p>
        </div>
        <div style={{ flex: 1, padding: "10px", border: "1px solid #ccc" }}>
          <h2>Transactions</h2>
          <p>Total Transactions: {transactions.length}</p>
        </div>
      </div>

      {/* Chart */}
      <h2 style={{ marginTop: "40px" }}>Stock Movements (IN vs OUT)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sku" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="IN" fill="#4caf50" />
          <Bar dataKey="OUT" fill="#f44336" />
        </BarChart>
      </ResponsiveContainer>

      {/* Transactions Table */}
      <h2 style={{ marginTop: "40px" }}>Transactions</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => {
            const sku = skus.find((s) => s.id === t.skuId);
            return (
              <tr key={t.id}>
                <td>{sku?.code}</td>
                <td>{t.quantity}</td>
                <td>{t.type}</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => deleteTransaction(t.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Add Transaction Form */}
      <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <h3>Add Transaction</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const skuId = Number((e.target as any).skuId.value);
            const quantity = Number((e.target as any).quantity.value);
            const type = (e.target as any).type.value as "IN" | "OUT";
            addTransaction(skuId, quantity, type);
            (e.target as any).reset();
          }}
        >
          <label>
            SKU:
            <select name="skuId">
              {skus.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code}
                </option>
              ))}
            </select>
          </label>
          <label style={{ marginLeft: "10px" }}>
            Quantity:
            <input type="number" name="quantity" min={1} required />
          </label>
          <label style={{ marginLeft: "10px" }}>
            Type:
            <select name="type">
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
            </select>
          </label>
          <button type="submit" style={{ marginLeft: "10px" }}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
