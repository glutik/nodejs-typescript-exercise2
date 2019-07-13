import express, {Request, Response, NextFunction} from 'express';
import uuidv1 from 'uuid/v1';
import {Product} from '../models';
import * as utils from '../utils';

const productsData = require('../data/products.json');
const products: Product[] = productsData.products;
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(products);
});

router.get('/:id',
    utils.checkIndexLengthOrBadRequest,
    utils.findByIndexOrNotFound.bind(null, products),
    (req, res) => {
        const product = products[res.locals.entityIndex];
        res.send(product);
    });

router.post('/',
    utils.checkNameLengthOrConflict,
    (req, res) => {
        const product: Product = req.body;
        product.id = uuidv1();
        products.push(product);
        res.status(201).send(product);
    });

router.put('/:id',
    utils.checkIndexLengthOrBadRequest,
    utils.checkNameLengthOrConflict,
    utils.findByIndexOrNotFound.bind(null, products),
    (req, res) => {
        const {id} = req.params;
        const product: Product = req.body;
        product.id = id;

        products[res.locals.entityIndex] = product;
        res.status(200).send(product);
    });

router.delete('/:id',
    utils.checkIndexLengthOrBadRequest,
    utils.findByIndexOrNotFound.bind(null, products),
    (req, res) => {
        products.splice(res.locals.entityIndex, 1);
        res.sendStatus(204);
    });

export {router};
