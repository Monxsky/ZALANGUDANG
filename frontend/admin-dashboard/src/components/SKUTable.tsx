import { useEffect, useState } from "react";
import { SKU } from "../types/sku";
import { fetchSKUs, createSKU, updateSKU, deleteSKU } from "../services/api";
import SKUForm from "./SKUForm";

export default function SKUTable() {
  const [skus, setSkus] = useState<SKU[]>([]);
  const [editing, setEditing] = useState<SKU | null>(null);

  const loadSKUs = async () => {
    const data = await fetchSKUs();
    setSkus(data);
  };

  useEffect(() => {
    loadSKUs();
  }, []);

  const handleAdd = async (sku: Omit<SKU, "id">) => {
    await createSKU(sku);
    loadSKUs();
  };

  const handleUpdate = async (id: number, sku: Partial<SKU>) => {
    await updateSKU(id, sku);
    setEditing(null);
    loadSKUs();
  };

  const handleDelete = async (id: number) => {
    await deleteSKU(id);
    loadSKUs();
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Daftar SKU</h2>
      <SKUForm onSubmit={handleAdd} />
      <table className="border mt-4">
        <thead>
          <tr>
            <th>ID</th><th>Nama</th><th>Kode</th><th>Stok</th><th>Harga</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {skus.map((sku) => (
            <tr key={sku.id}>
              <td>{sku.id}</td>
              <td>{sku.name}</td>
              <td>{sku.code}</td>
              <td>{sku.stock}</td>
              <td>{sku.price}</td>
              <td>
                <button onClick={() => setEditing(sku)}>Edit</button>
                <button onClick={() => handleDelete(sku.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <SKUForm
          onSubmit={(form) => handleUpdate(editing.id, form)}
          initialData={editing}
        />
      )}
    </div>
  );
}
