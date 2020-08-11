import { NextFunction, Request, Response } from 'express';

import { cache, USER_KEY_PREFIX, USER_POSTS_KEY_PREFIX } from '../config/cache';
import { getFromCache } from '../middleware/caching.middleware';
import { IPost } from '../interfaces/post';
import { IUser } from '../interfaces/user';
import { PostService } from '../services/post.service';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

export class UserController {
    private userService = new UserService();
    private postService = new PostService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const entity: UserEntity = req.body;

        try {
            const user: IUser = await this.userService.create(entity);
            const key = USER_KEY_PREFIX + user._id;

            cache.set(key, JSON.stringify(user));
            res.status(201).json({ data: user, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;
        const key: string = USER_KEY_PREFIX + id;

        try {
            const users: IUser[] = await this.userService.delete(id);

            cache.del(key);
            res.status(200).json({ data: users, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };

    public get = [
        (req: Request, res: Response, next: NextFunction) => {
            const id: string = req.params.id;
            const key: string = USER_KEY_PREFIX + id;

            getFromCache(key, 'get', res, next);
        },
        async (req: Request, res: Response, next: NextFunction) => {
            const id: string = req.params.id;
            const key: string = USER_KEY_PREFIX + id;

            try {
                const user: IUser | null = await this.userService.get(id);

                cache.set(key, JSON.stringify(user));
                res.status(200).json({ data: user, message: 'get' });
            } catch (error) {
                next(error);
            }
        }
    ];

    public getPosts = [
        (req: Request, res: Response, next: NextFunction) => {
            const id: string = req.params.id;
            const key = USER_POSTS_KEY_PREFIX + id;

            cache.hgetall(key, (err: any, value: { [key: string]: string }) => {
                if (value) {
                    const entries: IPost[] = [];
                    Object.keys(value).forEach((key: string) => {
                        entries.push(JSON.parse(value[key]));
                    });

                    res.status(200).json({ data: entries, message: 'getPosts' });
                } else {
                    next();
                }
            });
        },
        async (req: Request, res: Response, next: NextFunction) => {
            const id: string = req.params.id;

            try {
                const posts: IPost[] = await this.postService.findByUserId(id);

                res.status(200).json({ data: posts, message: 'getPosts' });
            } catch (error) {
                next(error);
            }
        }
    ];

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const incoming: IUser = req.body;
        const id: string = req.params.id;
        const key: string = USER_KEY_PREFIX + id;

        try {
            const users: IUser[] = await this.userService.update(id, incoming);

            if (users && users.length == 1) {
                cache.set(key, JSON.stringify(users[0]));
            }

            res.status(200).json({ data: users, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };
}
