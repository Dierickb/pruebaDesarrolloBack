import express from 'express';
import { UserEntity } from '../entities/auth.entity'

export const createUser = async (req: express.Request, res: express.Response) => {
    try {
        const { name, money } = req.body;

        const user = new UserEntity();
        user.name = name;      
        user.money = money; 
         
        await user.save();

        console.log(user);
        return res.json(user);
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
            });

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const result = await UserEntity.delete({ id: (req.params.id) });
        if(result.affected === 0) {
            return res.status(404).json({ message:"User not Found"})
        };
        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const user = await UserEntity.findOneBy({id: (req.params.id)});
        if (user === null) {return res.status(404).json({ message:"User not Found"})}
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};