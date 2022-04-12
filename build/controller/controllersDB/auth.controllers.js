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
exports.getUser = exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const auth_entity_1 = require("../../entities/auth.entity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = require("argon2");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // saving new user
        let { name, password, nickName, money } = req.body;
        password = yield (0, argon2_1.hash)(password); //encriptando contraseña
        const user = new auth_entity_1.UserEntity();
        user.name = name;
        user.money = money;
        user.nickName = nickName,
            user.password = password;
        const savedUser = yield user.save();
        const token = jsonwebtoken_1.default.sign({ id: savedUser.id }, process.env.TOKEN_SECRET || 'tokentest');
        console.log(token);
        return res.header('auth-token', token).json(savedUser);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error);
        }
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield auth_entity_1.UserEntity.find();
        return res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        ;
    }
    ;
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_entity_1.UserEntity.findOneBy({ id: (req.params.id) });
        if (!user) {
            return res.status(404).json({ message: "User does not exist." });
        }
        yield auth_entity_1.UserEntity.update({ id: (req.params.id) }, {
            name: req.body.name,
        });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_entity_1.UserEntity.delete({ id: (req.params.id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "User not Found" });
        }
        ;
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_entity_1.UserEntity.findOneBy({ id: (req.params.id) });
        if (user === null) {
            return res.status(404).json({ message: "User not Found" });
        }
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUser = getUser;
