import React, { useState } from "react";
import { product } from "../services/productService";
import { v4 as uuidv4} from 'uuid'

interface ProductFormProps {
  initialData: Omit<product, "id">;
  onSave: (data: Omit<product, "id">) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSave }) => {
  const [name, setName] = useState(initialData.name ?? "");
  const [description, setDescription] = useState(initialData.description ?? "");
  const [price, setPrice] = useState(initialData.price ?? 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description: description || "", // pastikan string, bukan null
      price,
      sku: "",
      stock: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
