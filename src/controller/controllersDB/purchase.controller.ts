import express from 'express';
import { PurchaseProductEntity } from '../../entities/custom/purchases-products.entity';
import { ProductEntity } from '../../entities/product.entity';

export const createPurchase = async (req: express.Request, res: express.Response) => {
    try {
        let { quantityProduct, user, products } = req.body;
        let totalPrice = 0;
        let i =0;

        const productsDB = await ProductEntity.find({ select: ["id", "price"] });

        for (let elements of products) {
            for (let elementsDB of productsDB){
                if(elements.id === elementsDB.id){
                    totalPrice = (elementsDB.price*quantityProduct[i]) + totalPrice;
                };
            };
            i=i+1;
        };

        const purchase = new PurchaseProductEntity();
        purchase.products = products;
        purchase.quantityProduct = quantityProduct;
        purchase.totalPrice = totalPrice;
        purchase.user = user;

        await purchase.save();

        console.log(purchase);
        return res.json(purchase);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error);
        }
    }
};

export const getPurchases = async (req: express.Request, res: express.Response) => {
    try {

        const purchase = await PurchaseProductEntity.find();
        return res.json(purchase);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        };
    };
};

export const getPurchase = async (req: express.Request, res: express.Response) => {
    try {
        const purchase = await PurchaseProductEntity.findOneBy({ id: (req.params.id) });
        if (purchase === null) { return res.status(404).json({ message: "Purchase not Found" }) }
        return res.json(purchase);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        };
    };
};