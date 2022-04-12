import * as dotenv from "dotenv";
import express from 'express';
import { hash, verify } from 'argon2';
import { UserEntity } from '../entities/auth.entity'
import jwt from 'jsonwebtoken';

const router: express.Router = express.Router();
dotenv.config()

export const login = async (req: express.Request, res: express.Response) => {
    try {

        const user = await UserEntity.findOneBy({ nickName: req.body.nickName })
      
        if (!user) return res.status(400).json('Invalid NickName')
       

        const checked: boolean = await verify(user.password, req.body.password)

        if (!checked) return res.status(400).json('Invalid Password')

        const token: string = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: 60 * 60 * 24
        })

        res.header('auth-token', token).json(user)
    } catch (e) {
        console.log("")
        console.error(e);
        console.log("")
    }

}

export const getIndex = (req: express.Request, res: express.Response) => {
    //console.log(req.header('auth-token'));
    res.send('Index');
};

export const profile = async (req: express.Request, res: express.Response) => {
    try {
        const user = await UserEntity.findOneBy({ id: req.userId })
        
        if (!user) return res.status(400).json('No User Found')
        
        res.json(user);
    } catch (e) {
        console.error(e);
    };
};


export default router;
