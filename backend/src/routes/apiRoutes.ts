import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/productController';
import { getSKUs, createSKU } from '../controllers/skuController';
import { createNewTransaction, listTransactions } from '../controllers/transactionController';

const router = Router();

// Product routes
router.get('/products', getProducts);
router.post('/products', createProduct);

// SKU routes
router.get('/skus', getSKUs);
router.post('/skus', createSKU);

// Transaction routes
router.get('/transactions', listTransactions);
router.post('/transactions', createNewTransaction);

export default router;
