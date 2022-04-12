import express from "express";
import { createUser, deleteUser, getUsers, updateUser, getUser } from "../../controller/controllersDB/user.controllers";
const secret = {secret: process.env.SECRET || 'secret', algorithms: ['HS256'] };

const router = express.Router();

router.get('/user', getUsers)

router.get('/user/:id', getUser);

router.post('/user', createUser);

router.put('/user/:id', updateUser);

router.delete('/user/:id', deleteUser);

export default router;