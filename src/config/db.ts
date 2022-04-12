import * as dotenv from "dotenv";
import { DataSource } from 'typeorm';

dotenv.config()

export const getEnvironment = (k: string): string | undefined => {
    return process.env[k];
}

export const getNumberEnv = (k: string): number => {
    return Number(getEnvironment(k));
};

export const nodeEnv = (): string => {
    return getEnvironment('NODE_ENV')?.trim() || "";
}

export const createPathEnv = (path: string): string => {
    const arrEnv: string[] = ['env'];
    if (path.length > 0) {
        const stringToArray = path.split('.');
        arrEnv.unshift(...stringToArray);
    }
    return '.' + arrEnv.join('.');
}

export const nodeNameEnv = createPathEnv(nodeEnv())

export const AppDataSource = new DataSource({
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
    connectTimeoutMS: Number(
        process.env.DB_POOL_CLIENT_CONNECTION_TIMEOUT
    ),
});
dotenv.config({
    path: nodeNameEnv,
});

