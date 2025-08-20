// src/pages/Transactions.tsx
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, InputNumber, Select, message } from "antd";
import { getTransactions, saveTransaction } from "../services/transactionService";
import { getProducts, product } from "../services/productService";

interface TransactionItem {
  id: number;
  totalPrice: number;
  createdAt: string;
  items: {
    productId: number;
    quantity: number;
    price: number;
    total: number;
  }[];
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch transactions");
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch products");
    }
  };

  const handleAddTransaction = async () => {
    try {
      const values = await form.validateFields();
      const items = values.items.map((i: any) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
        total: i.quantity * i.price
      }));
      await saveTransaction(items);
      message.success("Transaction saved");
      form.resetFields();
      setIsModalVisible(false);
      fetchTransactions();
    } catch (err) {
      console.error(err);
      message.error("Failed to save transaction");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
  ];

  return (
    <div>
      <h2>Transactions</h2>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Transaction
      </Button>
      <Table
        columns={columns}
        dataSource={transactions}
        loading={loading}
        rowKey="id"
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Add Transaction"
        open={isModalVisible}
        onOk={handleAddTransaction}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" name="transactionForm">
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <div key={field.key} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <Form.Item
                      {...field}
                      name={[field.name, "productId"]}
                      fieldKey={[field.fieldKey ?? field.name, "productId"]}
                      rules={[{ required: true, message: "Select product" }]}
                    >
                      <Select
                        placeholder="Select product"
                        options={products.map(p => ({ label: p.name, value: p.id }))}
                        style={{ width: 150 }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "quantity"]}
                      fieldKey={[field.fieldKey ?? field.name, "quantity"]}
                      rules={[{ required: true, message: "Quantity required" }]}
                    >
                      <InputNumber min={1} placeholder="Qty" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "price"]}
                      fieldKey={[field.fieldKey ?? field.name, "price"]}
                      rules={[{ required: true, message: "Price required" }]}
                    >
                      <InputNumber min={0} placeholder="Price" />
                    </Form.Item>
                    <Button danger onClick={() => remove(field.name)}>Remove</Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + Add Item
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default Transactions;
