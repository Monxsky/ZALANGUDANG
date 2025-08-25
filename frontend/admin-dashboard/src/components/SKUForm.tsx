import { useState } from "react";
import { SKU } from "../types/sku";

interface Props {
  onSubmit: (sku: Omit<SKU, "id">) => void;
  initialData?: SKU;
}

export default function SKUForm({ onSubmit, initialData }: Props) {
  const [form, setForm] = useState<Omit<SKU, "id">>({
    name: initialData?.name || "",
    code: initialData?.code || "",
    stock: initialData?.stock || 0,
    price: initialData?.price || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "stock" || name === "price" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", code: "", stock: 0, price: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-2 mt-2">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" />
      <input name="code" value={form.code} onChange={handleChange} placeholder="Kode" />
      <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stok" />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Harga" />
      <button type="submit">Simpan</button>
    </form>
  );
}
