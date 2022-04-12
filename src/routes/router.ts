import express from 'express';
import { UserEntity } from '../entities/user.entity'
import * as dotenv from "dotenv";
import {getEnvironment} from '../config/db'

const router = express.Router();
dotenv.config()

export const login = async (req: express.Request, res: express.Response) => {
    try { 
        const user = await UserEntity.findOneBy({ name: (req.body.userName) })

        console.log("")
        console.log(req.body.userName)
        console.log("")

        return res.sendStatus(204)
    } catch (e) {
        console.log("")
        console.error(e);
        console.log("")
    }

}

export const authenticateToken = (req:express.Request, res: express.Response,next: express.NextFunction) => {
    let environment: any = getEnvironment("ACCESS_TOKEN_SECRET");
    const authHeader = req.headers['authorization'];
    const token:any = authHeader &&  authHeader.split(' ')[1];
    if (token === null){return res.sendStatus(401)}
}

export const getIndex = (_req: express.Request, res: express.Response) => {
    res.status(200).json({
        user: "Dierick Brochero Nibeles"
    })
};


export default router;
