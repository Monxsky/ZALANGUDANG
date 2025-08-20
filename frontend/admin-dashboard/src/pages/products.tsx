import React, { useEffect, useState } from "react";
import { product, getProducts, createProduct, updateProduct, deleteProduct } from "../services/productService";
import Modal from "../components/modal";
import ProductForm from "../components/ProductForm";
import { Product } from "@prisma/client";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      // pastikan semua product punya description
      setProducts(data.map(p => ({ ...p, description: p.description || "" })));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleSave = async (productData: Omit<product, "id">) => {
  try {
    if (editingProduct) {
      const updated = await updateProduct(editingProduct.id, productData);
      setProducts(products.map(p => (p.id === updated.id ? updated : p)));
    } else {
      const created = await createProduct(productData);
      setProducts([...products, created]);
    }
    setIsModalOpen(false);
  } catch (err) {
    console.error("Failed to save product:", err);
  }
};

  return (
    <div>
      <h1>Products</h1>
      <button onClick={handleAdd}>Add Product</button>
      <table border={1} cellPadding={5} style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal
          title={editingProduct ? "Edit Product" : "Add Product"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ProductForm
  initialData={
    editingProduct
      ? {
          name: editingProduct.name,
          description: editingProduct.description ?? "",
          price: editingProduct.price,
        }
      : {
          name: "",
          description: "",
          price: 0,
          sku: "",
          stock: 0,
        }
  }
  onSave={handleSave}
/>
        </Modal>
      )}
    </div>
  );
};

export default ProductsPage;
