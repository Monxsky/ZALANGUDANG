import { Request, Response } from "express";
import * as skuModel from "../models/skuModel";

export const getSKUs = async (req: Request, res: Response) => {
  const data = await skuModel.getAllSKUs();
  res.json(data);
};

export const addSKU = async (req: Request, res: Response) => {
  const sku = await skuModel.createSKU(req.body);
  res.json(sku);
};

export const editSKU = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await skuModel.updateSKU(Number(id), req.body);
  res.json(updated);
};

export const removeSKU = async (req: Request, res: Response) => {
  const { id } = req.params;
  await skuModel.deleteSKU(Number(id));
  res.sendStatus(204);
};
