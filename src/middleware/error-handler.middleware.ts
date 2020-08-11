import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../exceptions/http-exception';

export function errorHandlerMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
    const message: string = error.message || 'An unexpected error occurred';
    const status: number = error.status || 500;

    console.error(`[ERROR] ${status} {$message}`);

    res.status(status).json({ message });
}
