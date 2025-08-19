import { Request, Response } from 'express';
import { getAllSKUs, createNewSKU } from '../services/skuService';

export const getSKUs = async (req: Request, res: Response) => {
  const skus = await getAllSKUs();
  res.json(skus);
};

export const createSKU = async (req: Request, res: Response) => {
  const { code, stock, productId } = req.body;
  const sku = await createNewSKU({ code, stock, productId });
  res.status(201).json(sku);
};
