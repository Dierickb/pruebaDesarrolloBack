import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRequire from './routes/index';
import userRequire from './routes/apiControllers/auth.routes';
import * as envConfig from './config/db'
import categoryRequire from './routes/apiControllers/category.routes';
import productRequire from './routes/apiControllers/product.routes';
import purchaseRequire from './routes/apiControllers/purchase.routes';

const app: Application = express();

// Settings
app.set("port", 3001);

// Middlewares
app.use(express.json()); // middleware que transforma la re.body a un json
app.use(express.urlencoded({ extended: true })); //
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: true}));

console.log("");
console.log("");
console.log("DIERICK BROCHERO");
console.log("");
console.log("");
app.use('/', indexRequire);
app.use('/', userRequire);
app.use('/', categoryRequire);
app.use('/', productRequire);
app.use('/', purchaseRequire);

export default { app, envConfig };