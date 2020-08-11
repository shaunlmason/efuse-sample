import { Router } from 'express';

import { IRoute } from '../interfaces/route';
import { UserController } from '../controllers/user.controller';
import { UserEntity } from '../entities/user.entity';
import { validationMiddleware } from '../middleware/validation.middleware';

export class UserRoutes implements IRoute {
    public controller: UserController = new UserController();
    public path: string = '/user';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.delete(`${this.path}/:id`, this.controller.delete);
        this.router.get(`${this.path}/:id/posts`, this.controller.getPosts);
        this.router.get(`${this.path}/:id`, this.controller.get);
        this.router.patch(`${this.path}/:id`, validationMiddleware(UserEntity, true), this.controller.update);
        this.router.post(`${this.path}`, validationMiddleware(UserEntity), this.controller.create);
    }
}
