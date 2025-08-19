import React, { useState } from 'react';
import api from '../services/api';

const AddProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/products', { name, price });
      alert(`Product ${res.data.name} berhasil dibuat!`);
      setName('');
      setPrice(0);
    } catch (err) {
      console.error(err);
      alert('Gagal membuat product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
