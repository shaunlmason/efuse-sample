import { Router } from 'express';

type Wrapper = (router: Router, env: boolean) => void;

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router, env: boolean) => {
    middlewareWrappers.forEach((wrapper: Wrapper) => {
        wrapper(router, env);
    });
};
