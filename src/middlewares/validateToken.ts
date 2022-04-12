import { Request, Response, NextFunction } from 'express'
import { UserEntity } from '../entities/auth.entity'
import jwt from 'jsonwebtoken';

interface IPayload {
    id: string;
    ia: number;
    exp: number;
};

export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('auth-token');
        
        if (!token) return res.status(401).json('Access denied');

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
        req.userId = decoded.id;

        const user = await UserEntity.findOneBy({ id: req.userId = decoded.id });
        if (!user) return res.status(404).json({ message: 'no user found' });

        next();

    } catch (e) {
        return res.status(401).json({message: "Unauthorized"});
    }
};