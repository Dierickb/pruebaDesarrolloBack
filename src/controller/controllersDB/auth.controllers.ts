import express from 'express';
import { UserEntity } from '../../entities/auth.entity'
import jwt from 'jsonwebtoken';
import { hash, verify } from 'argon2';

export const createUser = async (req: express.Request, res: express.Response) => {
    try {

        // saving new user
        let { name, password, nickName, money } = req.body;
        const userValidate = await UserEntity.findOneBy({ nickName: nickName })

        if (!userValidate) {
            password = await hash(password); //encriptando contraseña
            const user = new UserEntity();
            user.name = name;
            user.money = money;

            user.nickName = nickName,
                user.password = password
            const savedUser = await user.save();

            const token: string = jwt.sign({ id: savedUser.id }, process.env.TOKEN_SECRET || 'tokentest');

            console.log(token);

            return res.header('auth-token', token).json(savedUser);

        } else { return res.status(400).json('NickName en uso'); }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error);
        }
    }
};

export const getUsers = async (req: express.Request, res: express.Response) => {
    try {

        const users = await UserEntity.find();
        return res.json(users);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        };
    };
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const user = await UserEntity.findOneBy({ id: (req.params.id) })

        if (!user) { return res.status(404).json({ message: "User does not exist." }); }

        await UserEntity.update({ id: (req.params.id) },
            {
                name: req.body.name,
                password: req.body.password,
                money: req.body.money,
                nickName: req.body.nickName
            });

        return res.sendStatus(204).json("User data updated")
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const result = await UserEntity.delete({ id: (req.params.id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "User not Found" })
        };
        return res.sendStatus(204).json("User deleted");
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const user = await UserEntity.findOneBy({ id: (req.params.id) });
        if (user === null) { return res.status(404).json({ message: "User not Found" }) }
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};