import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from "../../controller/product.controller";

const router = express.Router();

router.get('/product', getProducts)

router.get('/product/:id', getProduct);

router.post('/product', createProduct);

router.put('/product/:id', updateProduct);

router.delete('/product/:id', deleteProduct);

export default router;