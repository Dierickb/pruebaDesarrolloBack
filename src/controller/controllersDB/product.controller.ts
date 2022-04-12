import express from 'express';
import { ProductEntity } from '../../entities/product.entity'
import { CategoryId, Category } from '../../types'

export const createProduct = async (req: express.Request, res: express.Response) => {
    try {
        let { productName, price, description, category } = req.body;
        price = (price);
        const productValidate = await ProductEntity.findOneBy({ productName: productName })
        
        if (productValidate) return res.status(400).json('Product had been created')

        const product = new ProductEntity();
        product.productName = productName;
        product.price = price;
        product.description = description;
        product.category = category;

        await product.save();

        console.log(product.category);
        return res.json(product);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error);
        }
    }
};

export const getProducts = async (req: express.Request, res: express.Response) => {
    try {

        const product = await ProductEntity.find();
        return res.json(product);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        };
    };
};

export const updateProduct = async (req: express.Request, res: express.Response) => {
    try {
        let { productName, price, description, category } = req.body;

        const product = await ProductEntity.findOneBy({ id: (req.params.id) });

        if (!product) { return res.status(404).json({ message: "Product does not exist." }); }

        if ( productName === undefined) {
            productName = product.productName
        };
        if ( price === undefined) {
            price = product.price;
        };
        if ( description === undefined) {
            description = product.description;
            console.log("")
            console.log(productName)
            console.log("")
        };
        if ( category === undefined) {
            category= { 'id': `${product.category.id}`}
            console.log("")
            console.log(category);
            console.log(category.id)
            console.log("")
        };

        

        await ProductEntity.update({ id: (req.params.id) },
            {
                productName: productName,
                price: price,
                description: description,      
                category: category
            });

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const result = await ProductEntity.delete({ id: (req.params.id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "Product not Found" })
        };
        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getProduct = async (req: express.Request, res: express.Response) => {
    try {
        const product = await ProductEntity.findOneBy({ id: (req.params.id) });
        if (product === null) { return res.status(404).json({ message: "Product not Found" }) }
        return res.json(product);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};