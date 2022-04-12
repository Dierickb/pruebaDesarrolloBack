"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.profile = exports.getIndex = exports.login = void 0;
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const argon2_1 = require("argon2");
const auth_entity_1 = require("../entities/auth.entity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
dotenv.config();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_entity_1.UserEntity.findOneBy({ nickName: req.body.nickName });
        if (!user)
            return res.status(400).json('Invalid NickName');
        const checked = yield (0, argon2_1.verify)(user.password, req.body.password);
        if (!checked)
            return res.status(400).json('Invalid Password');
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: 60 * 60 * 24
        });
        res.header('auth-token', token).json(token);
    }
    catch (e) {
        console.error(e);
    }
});
exports.login = login;
const getIndex = (req, res) => {
    //console.log(req.header('auth-token'));
    res.send('Index');
};
exports.getIndex = getIndex;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_entity_1.UserEntity.findOneBy({ id: req.userId });
        if (!user)
            return res.status(404).json('No User Found');
        //user.password = '';
        res.json(user);
    }
    catch (e) {
        console.error(e);
    }
    ;
});
exports.profile = profile;
exports.default = router;
