import { Router } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import logger from 'morgan';

export const handleBodyRequestParsing = (router: Router, env: boolean) => {
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
};

export const handleCompression = (router: Router, env: boolean) => {
    router.use(compression());
};

export const handleCookie = (router: Router, env: boolean) => {
    router.use(cookieParser());
};

export const handleCors = (router: Router, env: boolean) => {
    if (env) {
        router.use(cors({ credentials: true, origin: 'example.com' }));
    } else {
        router.use(cors({ credentials: true, origin: true }));
    }
};

export const handleHelmet = (router: Router, env: boolean) => {
    if (env) {
        router.use(helmet());
    }
};

export const handleHpp = (router: Router, env: boolean) => {
    if (env) {
        router.use(hpp());
    }
};

export const handleLogger = (router: Router, env: boolean) => {
    if (env) {
        router.use(logger('combined'));
    } else {
        router.use(logger('dev'));
    }
};
