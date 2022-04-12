"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const auth_entity_1 = require("../entities/auth.entity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
const TokenValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('auth-token');
        if (!token)
            return res.status(401).json('Access denied');
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
        req.userId = decoded.id;
        const user = yield auth_entity_1.UserEntity.findOneBy({ id: req.userId = decoded.id });
        if (!user)
            return res.status(404).json({ message: 'no user found' });
        next();
    }
    catch (e) {
        return res.status(401).json({ message: "Unauthorized" });
    }
});
exports.TokenValidation = TokenValidation;
