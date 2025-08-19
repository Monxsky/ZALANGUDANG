import React from 'react';

const SKUList: React.FC = () => {
  const skus = [
    { id: 1, code: 'Product A-SKU1', stock: 80 },
    { id: 2, code: 'Product A-SKU2', stock: 60 },
  ];

  return (
    <div>
      <h2>SKUs</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {skus.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.code}</td>
              <td>{s.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SKUList;
