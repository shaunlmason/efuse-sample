import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import logger from 'morgan';

import { applyMiddleware } from './utils/middleware.utils';
import { errorHandlerMiddleware } from './middleware/error-handler.middleware';
import { initDependencies } from './config';
import { IRoute } from './interfaces/route';
import middleware from './middleware';

export class ApiApplication {
    public env: boolean;
    public instance: express.Application;
    public port: string | number;
    public verbose: boolean = true;

    constructor(routes: IRoute[]) {
        this.instance = express();
        this.port = process.env.PORT || 4000;
        this.env = process.env.NODE_ENV === 'production' ? true : false;

        applyMiddleware(middleware, this.instance, this.env);
        this.applyRoutes(routes);
        this.applySwagger();
        this.applyErrorHandling();
    }

    public async listen() {
        await initDependencies();

        this.instance.disable('x-powered-by');
        this.instance.listen(this.port, () => {
            console.info('🛸' + '\xa0\xa0' + `app listening on port ${this.port}`);
        });
    }

    public server(): express.Application {
        return this.instance;
    }

    private applyErrorHandling(): void {
        this.instance.use(errorHandlerMiddleware);
    }

    private applyRoutes(routes: IRoute[]) {
        routes.forEach((route) => {
            this.instance.use('/', route.router);
        });
    }

    private applySwagger(): void {
        const swaggerJSDoc = require('swagger-jsdoc');
        const swaggerUi = require('swagger-ui-express');

        const specs = swaggerJSDoc({
            apis: ['swagger.yaml'],
            swaggerDefinition: {
                info: {
                    title: 'eFuse REST API',
                    version: '0.0.1',
                    description: 'example docs'
                }
            }
        });

        this.instance.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
    }
}

process.on('uncaughtException', (e) => {
    console.error({
        message: `uncaught exception`,
        extra: e
    });

    process.exit(1);
});

process.on('unhandledRejection', (e) => {
    console.error({
        message: `unhandled rejection`,
        extra: e
    });

    process.exit(1);
});
