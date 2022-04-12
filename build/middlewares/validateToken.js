"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
const TokenValidation = (req, res, next) => {
    const token = req.header('auth-token');
    console.log("");
    console.log(token);
    console.log("");
    if (!token)
        return res.status(401).json('Access denied');
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
    req.nickName = payload.id;
    console.log("");
    console.log(req.nickName);
    console.log("");
    next();
};
exports.TokenValidation = TokenValidation;
