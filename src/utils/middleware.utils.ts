import { Router } from 'express';

type Wrapper = (router: Router, env: boolean) => void;

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router, env: boolean) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router, env);
    }
};
