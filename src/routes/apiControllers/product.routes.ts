import express from "express";
import { TokenValidation } from '../../middlewares/validateToken';
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from "../../controller/controllersDB/product.controller";

const router = express.Router();

router.get('/product', getProducts)

router.get('/product/:id', getProduct);

router.post('/product', createProduct);

router.put('/product/:id', TokenValidation, updateProduct);

router.delete('/product/:id', TokenValidation, deleteProduct);

export default router;