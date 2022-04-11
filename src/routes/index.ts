import express from 'express';
const router = express.Router();

import {
    getIndex,
} from './router';

router.get('/', getIndex);

export default router;

