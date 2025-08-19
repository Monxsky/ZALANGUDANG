import React from 'react';

const TransactionList: React.FC = () => {
  const transactions = [
    { id: 1, sku: 'Product A-SKU1', quantity: 50, type: 'IN' },
    { id: 2, sku: 'Product A-SKU1', quantity: 20, type: 'OUT' },
  ];

  return (
    <div>
      <h2>Transactions</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.sku}</td>
              <td>{t.quantity}</td>
              <td>{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
