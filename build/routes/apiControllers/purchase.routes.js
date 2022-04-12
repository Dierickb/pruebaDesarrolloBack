"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchase_controller_1 = require("../../controller/controllersDB/purchase.controller");
const router = express_1.default.Router();
router.get('/purchase', purchase_controller_1.getPurchases);
router.get('/purchase/:id', purchase_controller_1.getPurchase);
router.post('/purchase', purchase_controller_1.createPurchase);
exports.default = router;
