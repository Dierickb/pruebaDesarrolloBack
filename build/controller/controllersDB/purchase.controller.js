"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurchase = exports.getPurchases = exports.createPurchase = void 0;
const purchases_products_entity_1 = require("../../entities/custom/purchases-products.entity");
const product_entity_1 = require("../../entities/product.entity");
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { quantityProduct, user, products } = req.body;
        let totalPrice = 0;
        let i = 0;
        const productsDB = yield product_entity_1.ProductEntity.find({ select: ["id", "price"] });
        for (let elements of products) {
            for (let elementsDB of productsDB) {
                if (elements.id === elementsDB.id) {
                    totalPrice = (elementsDB.price * quantityProduct[i]) + totalPrice;
                }
                ;
            }
            ;
            i = i + 1;
        }
        ;
        const purchase = new purchases_products_entity_1.PurchaseProductEntity();
        purchase.products = products;
        purchase.quantityProduct = quantityProduct;
        purchase.totalPrice = totalPrice;
        purchase.user = user;
        yield purchase.save();
        console.log(purchase);
        return res.json(purchase);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error);
        }
    }
});
exports.createPurchase = createPurchase;
const getPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchase = yield purchases_products_entity_1.PurchaseProductEntity.find();
        return res.json(purchase);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        ;
    }
    ;
});
exports.getPurchases = getPurchases;
const getPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchase = yield purchases_products_entity_1.PurchaseProductEntity.findOneBy({ id: (req.params.id) });
        if (purchase === null) {
            return res.status(404).json({ message: "Purchase not Found" });
        }
        return res.json(purchase);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        ;
    }
    ;
});
exports.getPurchase = getPurchase;
