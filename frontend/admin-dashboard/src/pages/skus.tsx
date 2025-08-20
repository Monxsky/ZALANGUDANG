import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber } from "antd";
import { getProducts, createProduct, updateProduct, deleteProduct, product } from "../services/productService";

const Skus: React.FC = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<product | null>(null);
  const [form] = Form.useForm();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrEdit = async () => {
    const values = await form.validateFields();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, values);
      } else {
        await createProduct(values);
      }
      setIsModalVisible(false);
      setEditingProduct(null);
      form.resetFields();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product: product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: product) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Product Management</h2>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Product</Button>
      <Table columns={columns} dataSource={products} rowKey="id" loading={loading} style={{ marginTop: 20 }} />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalVisible}
        onOk={handleAddOrEdit}
        onCancel={() => { setIsModalVisible(false); setEditingProduct(null); form.resetFields(); }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, type: "number", min: 0 }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Skus;
