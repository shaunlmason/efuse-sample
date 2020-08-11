import { NextFunction, Request, RequestHandler, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { HttpException } from '../exceptions/http-exception';

export function validationMiddleware(type: any, skipMissingProperties = false): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        validate(plainToClass(type, req.body), { skipMissingProperties }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors.map((error: ValidationError) => Object.values(error.constraints ?? {})).join(', ');

                next(new HttpException(400, message));
            } else {
                next();
            }
        });
    };
}
