import { NextFunction, Request, Response } from 'express';

import { cache, POST_KEY_PREFIX, USER_POSTS_KEY_PREFIX } from '../config/cache';
import { getFromCache } from '../middleware/caching.middleware';
import { IPost } from '../interfaces/post';
import { PostEntity } from '../entities/post.entity';
import { PostService } from '../services/post.service';

export class PostController {
    private service = new PostService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const entity: PostEntity = req.body;

        try {
            const post: IPost = await this.service.create(entity);
            const key = POST_KEY_PREFIX + post._id;
            const userKey = USER_POSTS_KEY_PREFIX + post.user;

            cache.set(key, JSON.stringify(post));
            cache.hmset(userKey, [post._id, JSON.stringify(post)]);

            res.status(201).json({ data: post, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;
        const key: string = POST_KEY_PREFIX + id;

        try {
            const posts: IPost[] = await this.service.delete(id);

            cache.del(key);
            if (posts && posts.length == 1) {
                const userKey = USER_POSTS_KEY_PREFIX + posts[0].user;
                cache.hdel(userKey, posts[0]._id);
            }

            res.status(200).json({ data: posts, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };

    public get = [
        (req: Request, res: Response, next: NextFunction) => {
            const id: string = req.params.id;
            const key: string = POST_KEY_PREFIX + id;

            getFromCache(key, 'get', res, next);
        },
        async (req: Request, res: Response, next: NextFunction) => {
            const id: string = req.params.id;
            const key: string = POST_KEY_PREFIX + id;

            try {
                const post: IPost = await this.service.get(id);

                cache.set(key, JSON.stringify(post));
                res.status(200).json({ data: post, message: 'get' });
            } catch (error) {
                next(error);
            }
        }
    ];

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const incoming: IPost = req.body;
        const id: string = req.params.id;
        const key: string = POST_KEY_PREFIX + id;

        try {
            const posts: IPost[] = await this.service.update(id, incoming);

            if (posts && posts.length == 1) {
                const userKey = USER_POSTS_KEY_PREFIX + posts[0].user;
                cache.set(key, JSON.stringify(posts[0]));
                cache.hmset(userKey, [posts[0]._id, JSON.stringify(posts[0])]);
            }

            res.status(200).json({ data: posts, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };
}
