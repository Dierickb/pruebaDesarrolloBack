import express from "express";
import { TokenValidation } from '../../middlewares/validateToken';
import { createCategory, deleteCategory, getCategories, updateCategory, getCategory } from "../../controller/controllersDB/category.controller";

const router = express.Router();

router.get('/category', getCategories)

router.get('/category/:id', getCategory);

router.post('/category', TokenValidation, createCategory);

router.put('/category/:id', TokenValidation, updateCategory);

router.delete('/category/:id', TokenValidation, deleteCategory);

export default router;