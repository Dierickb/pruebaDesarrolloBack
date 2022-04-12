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
exports.getCategory = exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createCategory = void 0;
const category_entity_1 = require("../../entities/category.entity");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName } = req.body;
        const categoryValidate = yield category_entity_1.CategoryEntity.findOneBy({ categoryName: categoryName });
        if (categoryValidate)
            return res.status(400).json('This category had been created');
        const Category = new category_entity_1.CategoryEntity();
        Category.categoryName = categoryName;
        yield Category.save();
        console.log(Category);
        return res.json(Category);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error);
        }
    }
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Category = yield category_entity_1.CategoryEntity.find();
        return res.json(Category);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        ;
    }
    ;
});
exports.getCategories = getCategories;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName } = req.body;
        const Category = yield category_entity_1.CategoryEntity.findOneBy({ id: (req.params.id) });
        if (!Category) {
            return res.status(404).json({ message: "Category does not exist." });
        }
        yield category_entity_1.CategoryEntity.update({ id: req.params.id }, {
            categoryName: categoryName
        });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield category_entity_1.CategoryEntity.delete({ id: (req.params.id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "Category not Found" });
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
exports.deleteCategory = deleteCategory;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Category = yield category_entity_1.CategoryEntity.findOneBy({ id: (req.params.id) });
        if (Category === null) {
            return res.status(404).json({ message: "Category not Found" });
        }
        return res.json(Category);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getCategory = getCategory;
