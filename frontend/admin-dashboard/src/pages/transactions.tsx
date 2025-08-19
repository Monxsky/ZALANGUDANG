import React, { useEffect, useState } from "react";
import { getTransactions, Transaction } from "../services/transactionService";

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Transactions</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>SKU</th>
            <th>Qty</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.skuId}</td>
              <td>{tx.quantity}</td>
              <td>{tx.type}</td>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
