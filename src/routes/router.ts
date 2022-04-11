import express from 'express';
const router = express.Router();


export const getIndex = (_req: express.Request, res: express.Response)=>{
    res.status(200).json({
        user: "Dierick Brochero Nibeles"
    })
};

export default router;
