import {Request, Response , NextFunction} from 'express'
import jwt from 'jsonwebtoken';

interface IPayload {
    id: string;
    ia: number;
    exp: number;
};

export const TokenValidation = (req:Request, res:Response, next:NextFunction) => {
    
    const token = req.header('auth-token');

    if (!token) return res.status(401).json('Access denied');

    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
    next();
};