import express from 'express';
import { TokenValidation } from '../middlewares/validateToken';
import {
    getIndex,
    login,
    profile,
} from './router';

const router = express.Router();

router.get('/', getIndex);
router.post('/login', login);
router.get('/profile', TokenValidation, profile)


export default router;

