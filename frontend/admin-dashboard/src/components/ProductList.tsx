import React from 'react';

const ProductList: React.FC = () => {
  const products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 150 },
  ];

  return (
    <div>
      <h2>Products</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
