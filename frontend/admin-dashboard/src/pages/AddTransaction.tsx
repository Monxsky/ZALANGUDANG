import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddTransaction: React.FC = () => {
  const [skus, setSkus] = useState<{ id: number; code: string }[]>([]);
  const [skuId, setSkuId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [type, setType] = useState<'IN' | 'OUT'>('IN');

  useEffect(() => {
    api.get('/skus').then(res => setSkus(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/transactions', { skuId, quantity, type });
      alert(`Transaction berhasil dibuat: ${res.data.id}`);
      setSkuId(0);
      setQuantity(0);
      setType('IN');
    } catch (err) {
      console.error(err);
      alert('Gagal membuat transaction');
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>SKU:</label>
          <select value={skuId} onChange={e => setSkuId(Number(e.target.value))} required>
            <option value="">--Select SKU--</option>
            {skus.map(s => <option key={s.id} value={s.id}>{s.code}</option>)}
          </select>
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={e => setType(e.target.value as 'IN' | 'OUT')} required>
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
