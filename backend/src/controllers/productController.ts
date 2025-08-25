import { Request, Response } from 'express';
import { getAllProducts, createNewProduct } from '../services/productService';

export const getProducts = async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const product = await createNewProduct({ name, description, price });
  res.status(201).json(product);
};
