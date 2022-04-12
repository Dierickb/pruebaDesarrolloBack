"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../../controller/controllersDB/auth.controllers");
const secret = { secret: process.env.SECRET || 'secret', algorithms: ['HS256'] };
const router = express_1.default.Router();
router.get('/user', auth_controllers_1.getUsers);
router.get('/user/:id', auth_controllers_1.getUser);
router.post('/user', auth_controllers_1.createUser);
router.put('/user/:id', auth_controllers_1.updateUser);
router.delete('/user/:id', auth_controllers_1.deleteUser);
exports.default = router;
