import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddSKU: React.FC = () => {
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [productId, setProductId] = useState<number>(0);
  const [code, setCode] = useState('');
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/skus', { productId, code, stock });
      alert(`SKU ${res.data.code} berhasil dibuat!`);
      setCode('');
      setStock(0);
      setProductId(0);
    } catch (err) {
      console.error(err);
      alert('Gagal membuat SKU');
    }
  };

  return (
    <div>
      <h2>Add SKU</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product:</label>
          <select value={productId} onChange={e => setProductId(Number(e.target.value))} required>
            <option value="">--Select Product--</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label>Code:</label>
          <input type="text" value={code} onChange={e => setCode(e.target.value)} required />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} required />
        </div>
        <button type="submit">Add SKU</button>
      </form>
    </div>
  );
};

export default AddSKU;
