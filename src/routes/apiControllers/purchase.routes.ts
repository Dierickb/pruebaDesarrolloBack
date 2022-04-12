import express from "express";
import { TokenValidation } from '../../middlewares/validateToken';
import { createPurchase, getPurchases, getPurchase } from "../../controller/controllersDB/purchase.controller";

const router = express.Router();

router.get('/purchase', getPurchases)

router.get('/purchase/:id', getPurchase);

router.post('/purchase', createPurchase);

export default router;