import express from 'express';
const router = express.Router();
const posts = [
    {
        userName: 'Dierick',
        title: 'Post 1'
    },
    {
        userName: 'Alison',
        title: 'Post 2'
    }
]
import {
    getIndex,
    login,
    authenticateToken
} from './router';

router.get('/', getIndex);
router.post('/', login);


export default router;

