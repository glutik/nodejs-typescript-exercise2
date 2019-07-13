import express, {Request, Response, NextFunction} from 'express';
import uuidv1 from 'uuid/v1';
import * as utils from '../utils';
import {Category, Product} from '../models';

const categoriesData = require('../data/categories.json');
const productsData = require('../data/products.json');
const categories: Category[] = categoriesData.categories;
const products: Product[] = productsData.products;

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(categories);
});

router.get('/:id/products',
    utils.checkIndexLengthOrBadRequest,
    utils.findByIndexOrNotFound.bind(null, categories),
    (req, res) => {
        const category = categories[res.locals.entityIndex];
        const categoryProducts = products.filter(prod => prod.categoryId === category.id);
        res.send(categoryProducts);
    });

router.get('/:id',
    utils.checkIndexLengthOrBadRequest,
    utils.findByIndexOrNotFound.bind(null, categories),
    (req, res) => {
        const category = categories[res.locals.entityIndex];
        res.send(category);
    });

router.post('/', (req, res) => {
    const category: Category = req.body;
    category.id = uuidv1();
    categories.push(category);
    res.status(201).send(category);
});

router.put('/:id',
    utils.checkIndexLengthOrBadRequest,
    utils.findByIndexOrNotFound.bind(null, categories),
    (req, res) => {
        const {id} = req.params;
        const category: Category = req.body;
        category.id = id;

        categories[res.locals.entityIndex] = category;
        res.status(200).send(category);
    });

router.delete('/:id',
    utils.checkIndexLengthOrBadRequest,
    utils.findByIndexOrNotFound.bind(null, categories),
    (req, res) => {
        categories.splice(res.locals.entityIndex, 1);
        res.sendStatus(204);
    });

export {router};
