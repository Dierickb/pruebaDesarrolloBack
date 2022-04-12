"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../../controller/controllersDB/product.controller");
const router = express_1.default.Router();
router.get('/product', product_controller_1.getProducts);
router.get('/product/:id', product_controller_1.getProduct);
router.post('/product', product_controller_1.createProduct);
router.put('/product/:id', product_controller_1.updateProduct);
router.delete('/product/:id', product_controller_1.deleteProduct);
exports.default = router;
