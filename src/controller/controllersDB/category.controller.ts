import express from 'express';
import { CategoryEntity } from '../../entities/category.entity'

export const createCategory = async (req: express.Request, res: express.Response) => {
    try {
        const {categoryName} = req.body;

        const categoryValidate = await CategoryEntity.findOneBy({ categoryName: categoryName })
        
        if (categoryValidate) return res.status(400).json('This category had been created')

        const Category = new CategoryEntity();
        Category.categoryName = categoryName;

        await Category.save();

        console.log(Category);
        return res.json(Category);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error);
        }
    }
};

export const getCategories = async (req: express.Request, res: express.Response) => {
    try {
        const Category = await CategoryEntity.find();
        return res.json(Category);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        };
    };
};

export const updateCategory = async (req: express.Request, res: express.Response) => {
    try {
        const {categoryName} = req.body;

        const Category = await CategoryEntity.findOneBy({ id: (req.params.id) })

        if (!Category) { return res.status(404).json({ message: "Category does not exist." }); }

        await CategoryEntity.update({ id: req.params.id },
            {
                categoryName: categoryName
            });

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const deleteCategory = async (req: express.Request, res: express.Response) => {
    try {
        const result = await CategoryEntity.delete({ id: (req.params.id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "Category not Found" })
        };
        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getCategory = async (req: express.Request, res: express.Response) => {
    try {
        const Category = await CategoryEntity.findOneBy({ id: (req.params.id) });
        if (Category === null) { return res.status(404).json({ message: "Category not Found" }) }
        return res.json(Category);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};