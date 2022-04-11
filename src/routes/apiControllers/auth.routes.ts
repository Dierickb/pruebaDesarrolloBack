import express from "express";

import { createUser, deleteUser, getUsers, updateUser, getUser } from "../../controller/auth.controllers";

const router = express.Router();

router.get('/auth', getUsers)

router.get('/auth/:id', getUser);

router.post('/auth', createUser);

router.put('/auth/:id', updateUser);

router.delete('/auth/:id', deleteUser);

export default router;