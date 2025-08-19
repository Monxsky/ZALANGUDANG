// src/pages/Products.tsx
import React, { useEffect, useState } from "react";
import Modal from "../components/modal";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({ name: "", description: "", price: 0 });
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({ name: product.name, description: product.description, price: product.price });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, form);
    } else {
      await createProduct(form);
    }
    setModalOpen(false);
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure to delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>
      <button onClick={openAddModal}>Add Product</button>
      <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => openEditModal(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={e => setForm({ ...form, price: +e.target.value })}
          />
          <button onClick={handleSubmit}>{editingProduct ? "Update" : "Create"}</button>
        </Modal>
      )}
    </div>
  );
};

export default Products;
