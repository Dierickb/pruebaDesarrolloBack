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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.nodeNameEnv = exports.createPathEnv = exports.nodeEnv = exports.getNumberEnv = exports.getEnvironment = void 0;
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
dotenv.config();
const getEnvironment = (k) => {
    return process.env[k];
};
exports.getEnvironment = getEnvironment;
const getNumberEnv = (k) => {
    return Number((0, exports.getEnvironment)(k));
};
exports.getNumberEnv = getNumberEnv;
const nodeEnv = () => {
    var _a;
    return ((_a = (0, exports.getEnvironment)('NODE_ENV')) === null || _a === void 0 ? void 0 : _a.trim()) || "";
};
exports.nodeEnv = nodeEnv;
const createPathEnv = (path) => {
    const arrEnv = ['env'];
    if (path.length > 0) {
        const stringToArray = path.split('.');
        arrEnv.unshift(...stringToArray);
    }
    return '.' + arrEnv.join('.');
};
exports.createPathEnv = createPathEnv;
exports.nodeNameEnv = (0, exports.createPathEnv)((0, exports.nodeEnv)());
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
    logging: true,
    synchronize: true,
    connectTimeoutMS: Number(process.env.DB_POOL_CLIENT_CONNECTION_TIMEOUT),
});
dotenv.config({
    path: exports.nodeNameEnv,
});
