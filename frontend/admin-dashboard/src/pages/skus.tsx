import { useState } from 'react';
import { getSKUs, createSKU, updateSKU, deleteSKU } from "../services/skuService";
import Modal from '../components/modal';

interface SKU {
  id: number;
  code: string;
  stock: number;
  productId: number;
}

const initialSKUs: SKU[] = [
  { id: 1, code: 'Product A-SKU1', stock: 80, productId: 1 },
  { id: 2, code: 'Product A-SKU2', stock: 60, productId: 1 },
  { id: 3, code: 'Product B-SKU1', stock: 80, productId: 2 },
  { id: 4, code: 'Product B-SKU2', stock: 60, productId: 2 },
];

export default function SKUs() {
  const [skus, setSkus] = useState<SKU[]>(initialSKUs);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSKU, setEditingSKU] = useState<SKU | null>(null);
  const [form, setForm] = useState({ code: "", stock: 0, productId: 0 });

  const handleDelete = (id: number) => setSkus(skus.filter(s => s.id !== id));
  const handleEdit = (sku: SKU) => { setEditingSKU(sku); setModalOpen(true); };
  const handleAdd = () => { setEditingSKU(null); setModalOpen(true); };
  const handleSave = (sku: SKU) => {
    if (editingSKU) setSkus(skus.map(s => s.id === sku.id ? sku : s));
    else setSkus([...skus, { ...sku, id: Date.now() }]);
    setModalOpen(false);
  };

  return (
    <div>
      <h2>SKUs</h2>
      <button onClick={handleAdd}>Add SKU</button>
      <table border={1} style={{ width: '100%', marginTop: '10px' }}>
        <thead><tr><th>ID</th><th>Code</th><th>Stock</th><th>Product ID</th><th>Actions</th></tr></thead>
        <tbody>
          {skus.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td><td>{s.code}</td><td>{s.stock}</td><td>{s.productId}</td>
              <td><button onClick={() => handleEdit(s)}>Edit</button> <button onClick={() => handleDelete(s.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && <Modal sku={editingSKU} onClose={() => setModalOpen(false)} onSave={handleSave} />}
    </div>
  );
}
