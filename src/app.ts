import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRequire from './routes/index';
import authRequire from './routes/apiControllers/user.routes';
import * as envConfig from './config/db'
import categoryRequire from './routes/apiControllers/category.routes';
import productRequire from './routes/apiControllers/product.routes';
import purchaseRequire from './routes/apiControllers/purchase.routes';

const app: Application = express();

// Middlewares
app.set("port", 80);
app.use(express.json()); // middleware que transforma la re.body a un json
app.use(express.urlencoded({ extended: true })); //
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/', indexRequire);
app.use('/', authRequire);
app.use('/', categoryRequire);
app.use('/', productRequire);
app.use('/', purchaseRequire);

export default { app, envConfig };