"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateToken_1 = require("../../middlewares/validateToken");
const auth_controllers_1 = require("../../controller/controllersDB/auth.controllers");
const secret = { secret: process.env.SECRET || 'secret', algorithms: ['HS256'] };
const router = express_1.default.Router();
router.get('/auth', auth_controllers_1.getUsers);
router.get('/auth/:id', auth_controllers_1.getUser);
router.post('/auth', auth_controllers_1.createUser);
router.put('/auth/:id', validateToken_1.TokenValidation, auth_controllers_1.updateUser);
router.delete('/auth/:id', validateToken_1.TokenValidation, auth_controllers_1.deleteUser);
exports.default = router;
