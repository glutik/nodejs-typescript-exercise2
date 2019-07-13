import express from 'express';
import {router as productsRouter} from './routers/products-router';
import {router as categoriesRouter} from './routers/categories-router';
import cors from 'cors';
// import { router as projectsRouter } from './controllers/projects';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

export {
    app,
};
