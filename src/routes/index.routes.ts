import { Router } from 'express';

import { IndexController } from '../controllers/index.controller';
import { IRoute } from '../interfaces/route';

export class IndexRoutes implements IRoute {
    public controller: IndexController = new IndexController();
    public path: string = '/';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(`${this.path}`, this.controller.index);
    }
}
