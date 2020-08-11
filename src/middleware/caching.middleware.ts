import { NextFunction, Response } from 'express';
import { promisify } from 'util';

import { cache } from '../config/cache';

const getAsync = promisify(cache.get).bind(cache);

export const getFromCache = async (key: string, message: string, res: Response, next: NextFunction) => {
    let data = await getAsync(key);

    if (data) {
        res.status(200).json({ data: JSON.parse(data), message: message });
    } else {
        next();
    }
};
