import express from "express";
import { TokenValidation } from '../../middlewares/validateToken';
import { createUser, deleteUser, getUsers, updateUser, getUser } from "../../controller/controllersDB/auth.controllers";
const secret = {secret: process.env.SECRET || 'secret', algorithms: ['HS256'] };

const router = express.Router();

router.get('/auth', getUsers);

router.get('/auth/:id',  getUser);

router.post('/auth', createUser);

router.put('/auth/:id', TokenValidation, updateUser);

router.delete('/auth/:id', TokenValidation, deleteUser);

export default router;