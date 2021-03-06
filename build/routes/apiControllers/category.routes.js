"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateToken_1 = require("../../middlewares/validateToken");
const category_controller_1 = require("../../controller/controllersDB/category.controller");
const router = express_1.default.Router();
router.get('/category', category_controller_1.getCategories);
router.get('/category/:id', category_controller_1.getCategory);
router.post('/category', validateToken_1.TokenValidation, category_controller_1.createCategory);
router.put('/category/:id', validateToken_1.TokenValidation, category_controller_1.updateCategory);
router.delete('/category/:id', validateToken_1.TokenValidation, category_controller_1.deleteCategory);
exports.default = router;
