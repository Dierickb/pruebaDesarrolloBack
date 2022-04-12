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
exports.getProduct = exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const product_entity_1 = require("../../entities/product.entity");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { productName, price, description, category } = req.body;
        price = (price);
        //category_id = (category_id);
        const product = new product_entity_1.ProductEntity();
        product.productName = productName;
        product.price = price;
        product.description = description;
        product.category = category;
        yield product.save();
        console.log(product.category);
        return res.json(product);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error);
        }
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_entity_1.ProductEntity.find();
        return res.json(product);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        ;
    }
    ;
});
exports.getProducts = getProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { productName, price, description, category } = req.body;
        const product = yield product_entity_1.ProductEntity.findOneBy({ id: (req.params.id) });
        const categories = category;
        if (!product) {
            return res.status(404).json({ message: "Product does not exist." });
        }
        if (productName === undefined) {
            productName = product.productName;
        }
        ;
        if (price === undefined) {
            price = product.price;
        }
        ;
        if (description === undefined) {
            description = product.description;
            console.log("");
            console.log(productName);
            console.log("");
        }
        ;
        if (category === undefined) {
            category = { 'id': `${product.category.id}` };
            console.log("");
            console.log(category);
            console.log(category.id);
            console.log("");
        }
        ;
        yield product_entity_1.ProductEntity.update({ id: (req.params.id) }, {
            productName: productName,
            price: price,
            description: description,
            category: category
        });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_entity_1.ProductEntity.delete({ id: (req.params.id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "Product not Found" });
        }
        ;
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteProduct = deleteProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_entity_1.ProductEntity.findOneBy({ id: (req.params.id) });
        if (product === null) {
            return res.status(404).json({ message: "Product not Found" });
        }
        return res.json(product);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getProduct = getProduct;
