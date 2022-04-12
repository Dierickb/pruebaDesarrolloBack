import express from "express";

import { createCategory, deleteCategory, getCategories, updateCategory, getCategory } from "../../controller/controllersDB/category.controller";

const router = express.Router();

router.get('/category', getCategories)

router.get('/category/:id', getCategory);

router.post('/category', createCategory);

router.put('/category/:id', updateCategory);

router.delete('/category/:id', deleteCategory);

export default router;