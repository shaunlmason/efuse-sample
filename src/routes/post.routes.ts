import { Router } from 'express';

import { PostController } from '../controllers/post.controller';
import { PostEntity } from '../entities/post.entity';
import { IRoute } from '../interfaces/route';
import { validationMiddleware } from '../middleware/validation.middleware';

export class PostRoutes implements IRoute {
    public controller: PostController = new PostController();
    public path: string = '/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.delete(`${this.path}/:id`, this.controller.delete);
        this.router.get(`${this.path}/:id`, this.controller.get);
        this.router.patch(`${this.path}/:id`, validationMiddleware(PostEntity, true), this.controller.update);
        this.router.post(`${this.path}`, validationMiddleware(PostEntity), this.controller.create);
    }
}
