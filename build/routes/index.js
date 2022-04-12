"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateToken_1 = require("../middlewares/validateToken");
const router_1 = require("./router");
const router = express_1.default.Router();
router.get('/', router_1.getIndex);
router.post('/login', router_1.login);
router.get('/profile', validateToken_1.TokenValidation, router_1.profile);
exports.default = router;
