import {NextFunction, Request, Response} from 'express';
import {Category, Product} from './models';

export function findByIndexOrNotFound(entities: Product[]|Category[], req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    const entityIndex = entities.findIndex(entity => entity.id === id);
    if (entityIndex < 0) {
        res.sendStatus(404);
        return;
    }

    res.locals.entityIndex = entityIndex;
    next();
}

export function checkIndexLengthOrBadRequest(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    if (id.length !== 36) {
        res.sendStatus(400);
        return;
    }
    next();
}

export function checkNameLengthOrConflict(req: Request, res: Response, next: NextFunction) {
    const {name} = req.body;
    if (name.length < 3) {
        res.sendStatus(409);
        return;
    }
    next();
}
