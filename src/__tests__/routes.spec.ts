import request from 'supertest';

import { ApiApplication } from '../app';
import { IndexRoutes } from '../routes/index.routes';
import { IPost } from '../interfaces/post';
import { IUser } from '../interfaces/user';
import { PostRoutes } from '../routes/post.routes';
import { UserRoutes } from '../routes/user.routes';

describe('@shaunlmason/efuse-sample => routes', () => {
    let app: ApiApplication;

    const userId: string = '3375c439-1513-4211-98f8-f99f4b08688a';

    const posts: IPost[] = [
        {
            _id: '',
            content: 'This is post one.',
            createdAt: new Date(),
            title: 'Post 1',
            user: userId
        },
        {
            _id: '',
            content: 'This is post two.',
            createdAt: new Date(),
            title: 'Post 2',
            user: userId
        }
    ];

    const users: IUser[] = [
        {
            _id: '',
            createdAt: new Date(),
            email: 'huskerdo@fireworks.org',
            firstName: 'Joe',
            lastName: 'Dirt',
            username: 'joe.dirt'
        },
        {
            _id: '',
            createdAt: new Date(),
            email: 'happy@madison.com',
            firstName: 'Happy',
            lastName: 'Gilmore',
            username: 'happy.gilmore'
        }
    ];

    beforeAll(() => {
        app = new ApiApplication([new IndexRoutes(), new UserRoutes(), new PostRoutes()]);
        app.verbose = false;
        app.listen();
    });

    describe('index.routes', () => {
        describe('[GET] /', () => {
            it('should respond with status code 200', async () => {
                expect.assertions(1);
                const res = await request(app.server()).get('/');
                expect(res.status).toEqual(200);
            });
        });
    });

    describe('user.routes', () => {
        describe('[DELETE]  /user/:id', () => {
            it('should correctly remove a user', async () => {
                expect.assertions(4);

                const save = await request(app.server()).post('/user').send(users[1]);
                const entity = save.body.data;
                const remove = await request(app.server()).delete(`/user/${entity._id}`);
                const get = await request(app.server()).get(`/user/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(remove.status).toEqual(200);
                expect(get.status).toEqual(404);
                expect(get.body).toHaveProperty('message');
            });

            it('should return 404 when attempting to delete entity that does not exist', async () => {
                expect.assertions(3);

                const save = await request(app.server()).post('/user').send(users[1]);
                const entity = save.body.data;
                const remove = await request(app.server()).delete(`/user/${entity._id}`);
                const failure = await request(app.server()).delete(`/user/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(remove.status).toEqual(200);
                expect(failure.status).toEqual(404);
            });
        });

        describe('[GET]     /user/:id', () => {
            it('should retrieve a user correctly', async () => {
                expect.assertions(10);

                const save = await request(app.server()).post('/user').send(users[0]);
                const entity = save.body.data;
                const get = await request(app.server()).get(`/user/${entity._id}`);
                const remove = await request(app.server()).delete(`/user/${entity._id}`);

                expect(get.status).toEqual(200);
                expect(get.body).toHaveProperty('data');
                expect(get.body).toHaveProperty('message', 'get');
                expect(get.body.data).toHaveProperty('_id');
                expect(get.body.data).toHaveProperty('createdAt');
                expect(get.body.data).toHaveProperty('email', users[0].email);
                expect(get.body.data).toHaveProperty('firstName', users[0].firstName);
                expect(get.body.data).toHaveProperty('lastName', users[0].lastName);
                expect(get.body.data).toHaveProperty('username', users[0].username);
                expect(remove.status).toEqual(200);
            });

            it('should return 404 on entity miss', async () => {
                expect.assertions(3);

                const save = await request(app.server()).post('/user').send(users[1]);
                const entity = save.body.data;
                const remove = await request(app.server()).delete(`/user/${entity._id}`);
                const get = await request(app.server()).get(`/user/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(remove.status).toEqual(200);
                expect(get.status).toEqual(404);
            });
        });

        describe('[GET]     /user/:id/posts', () => {
            it('should respond with status code 200', async () => {
                expect.assertions(6);

                const firstSave = await request(app.server()).post('/post').send(posts[0]);
                const secondSave = await request(app.server()).post('/post').send(posts[1]);
                const get = await request(app.server()).get(`/user/${userId}/posts`);
                const payload = get.body.data;
                const firstRemove = await request(app.server()).delete(`/post/${firstSave.body.data._id}`);
                const secondRemove = await request(app.server()).delete(`/post/${secondSave.body.data._id}`);

                expect(firstSave.status).toEqual(201);
                expect(secondSave.status).toEqual(201);
                expect(get.status).toEqual(200);
                expect(firstRemove.status).toEqual(200);
                expect(secondRemove.status).toEqual(200);

                expect(payload.length).toEqual(2);
            });

            it('should return empty array on entity miss', async () => {
                expect.assertions(6);

                const firstSave = await request(app.server()).post('/post').send(posts[0]);
                const secondSave = await request(app.server()).post('/post').send(posts[1]);
                const firstRemove = await request(app.server()).delete(`/post/${firstSave.body.data._id}`);
                const secondRemove = await request(app.server()).delete(`/post/${secondSave.body.data._id}`);
                const get = await request(app.server()).get(`/user/${userId}/posts`);

                expect(firstSave.status).toEqual(201);
                expect(secondSave.status).toEqual(201);
                expect(firstRemove.status).toEqual(200);
                expect(secondRemove.status).toEqual(200);
                expect(get.status).toEqual(200);
                expect(get.body.data.length).toEqual(0);
            });
        });

        describe('[POST]    /user', () => {
            it('should create a user correctly', async () => {
                expect.assertions(10);

                const save = await request(app.server()).post('/user').send(users[0]);
                const entity = save.body.data;
                const remove = await request(app.server()).delete(`/user/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(remove.status).toEqual(200);
                expect(save.body).toHaveProperty('data');
                expect(save.body).toHaveProperty('message', 'created');
                expect(entity).toHaveProperty('_id');
                expect(entity).toHaveProperty('createdAt');
                expect(entity).toHaveProperty('email', users[0].email);
                expect(entity).toHaveProperty('firstName', users[0].firstName);
                expect(entity).toHaveProperty('lastName', users[0].lastName);
                expect(entity).toHaveProperty('username', users[0].username);
            });

            it('should fail to save when entity is invalid', async () => {
                expect.assertions(1);

                const malformedUser = { firstName: 'Bruce', lastName: 'Wayne', username: 'batman' };
                const save = await request(app.server()).post('/user').send(malformedUser);

                expect(save.status).toEqual(400);
            });
        });

        describe('[PATCH]     /user/:id', () => {
            it('should update successfully', async () => {
                expect.assertions(12);

                const save = await request(app.server()).post('/user').send(users[0]);
                const entity = save.body.data;
                const update = await request(app.server()).patch(`/user/${entity._id}`).send({ email: 'huskerdont@fireworks.org' });
                const updatedEntity = update.body.data[0];
                const remove = await request(app.server()).delete(`/user/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(update.status).toEqual(200);
                expect(remove.status).toEqual(200);

                expect(save.body).toHaveProperty('data');
                expect(save.body).toHaveProperty('message', 'created');
                expect(update.body.data.length).toEqual(1);
                expect(updatedEntity).toHaveProperty('_id');
                expect(updatedEntity).toHaveProperty('createdAt');
                expect(updatedEntity).toHaveProperty('email', 'huskerdont@fireworks.org');
                expect(updatedEntity).toHaveProperty('firstName', users[0].firstName);
                expect(updatedEntity).toHaveProperty('lastName', users[0].lastName);
                expect(updatedEntity).toHaveProperty('username', users[0].username);
            });

            it('should return 404 when attempting to update entity that does not exist', async () => {
                expect.assertions(3);

                const save = await request(app.server()).post('/user').send(users[1]);
                const entity = save.body.data;
                const remove = await request(app.server()).delete(`/user/${entity._id}`);
                const update = await request(app.server()).patch(`/user/${entity._id}`).send({ email: 'huskerdont@fireworks.org' });

                expect(save.status).toEqual(201);
                expect(remove.status).toEqual(200);
                expect(update.status).toEqual(404);
            });

            it('should ignore invalid fields', async () => {
                expect.assertions(6);

                const malformedUser = { firstName: 'Bruce', lastName: 'Wayne', nickname: 'batman' };
                const save = await request(app.server()).post('/user').send(users[1]);
                const entity = save.body.data;
                const update = await request(app.server()).patch(`/user/${entity._id}`).send(malformedUser);
                const updatedEntity = update.body.data[0];
                const remove = await request(app.server()).delete(`/user/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(update.status).toEqual(200);
                expect(remove.status).toEqual(200);

                expect(updatedEntity).toHaveProperty('firstName', 'Bruce');
                expect(updatedEntity).toHaveProperty('lastName', 'Wayne');
                expect(updatedEntity).not.toHaveProperty('nickname');
            });
        });
    });

    describe('post.routes', () => {
        describe('[DELETE]   /post/:id', () => {
            it('should correctly remove a post', async () => {
                expect.assertions(4);

                const save = await request(app.server()).post('/post').send(posts[0]);
                const entity = save.body.data;
                const remove = await request(app.server()).delete(`/post/${entity._id}`);
                const get = await request(app.server()).get(`/post/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(remove.status).toEqual(200);
                expect(get.status).toEqual(404);

                expect(get.body).toHaveProperty('message');
            });

            it('should return 404 when attempting to delete entity that does not exist', async () => {
                expect.assertions(3);

                const save = await request(app.server()).post('/post').send(posts[0]);
                const entity = save.body.data;
                const remove = await request(app.server()).delete(`/post/${entity._id}`);
                const failure = await request(app.server()).get(`/post/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(remove.status).toEqual(200);
                expect(failure.status).toEqual(404);
            });
        });

        describe('[GET]      /post/:id', () => {
            it('should retrieve a post correctly', async () => {
                expect.assertions(7);

                const save = await request(app.server()).post('/post').send(posts[0]);
                const entity = save.body.data;
                const get = await request(app.server()).get(`/post/${entity._id}`);
                const remove = await request(app.server()).delete(`/post/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(get.status).toEqual(200);
                expect(remove.status).toEqual(200);

                expect(entity).toHaveProperty('_id');
                expect(entity).toHaveProperty('createdAt');
                expect(entity).toHaveProperty('content', posts[0].content);
                expect(entity).toHaveProperty('title', posts[0].title);
            });

            it('should return 404 on entity miss', async () => {
                expect.assertions(3);

                const save = await request(app.server()).post('/post').send(posts[0]);
                const entity = save.body.data;
                const remove = await request(app.server()).delete(`/post/${entity._id}`);
                const get = await request(app.server()).get(`/post/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(remove.status).toEqual(200);
                expect(get.status).toEqual(404);
            });
        });

        describe('[POST]     /post', () => {
            it('should create a post correctly', async () => {
                expect.assertions(9);

                const save = await request(app.server()).post('/post').send(posts[0]);
                const entity = save.body.data;
                const remove = await request(app.server()).delete(`/post/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(remove.status).toEqual(200);

                expect(save.body).toHaveProperty('data');
                expect(save.body).toHaveProperty('message', 'created');
                expect(entity).toHaveProperty('_id');
                expect(entity).toHaveProperty('createdAt');
                expect(entity).toHaveProperty('user', posts[0].user);
                expect(entity).toHaveProperty('title', posts[0].title);
                expect(entity).toHaveProperty('content', posts[0].content);
            });

            it('should fail to save when entity is invalid', async () => {
                expect.assertions(1);

                const malformedPost = { content: 'This is a malformed post.', title: 'Bad Post' };
                const save = await request(app.server()).post('/post').send(malformedPost);

                expect(save.status).toEqual(400);
            });
        });

        describe('[patch]      /post/:id', () => {
            it('should update successfully', async () => {
                expect.assertions(11);

                const save = await request(app.server()).post('/post').send(posts[0]);
                const entity = save.body.data;
                const update = await request(app.server()).patch(`/post/${entity._id}`).send({ title: 'Updated Title' });
                const updatedEntity = update.body.data[0];
                const remove = await request(app.server()).delete(`/post/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(update.status).toEqual(200);
                expect(remove.status).toEqual(200);

                expect(save.body).toHaveProperty('data');
                expect(save.body).toHaveProperty('message', 'created');
                expect(update.body.data.length).toEqual(1);
                expect(updatedEntity).toHaveProperty('_id');
                expect(updatedEntity).toHaveProperty('content', posts[0].content);
                expect(updatedEntity).toHaveProperty('createdAt');
                expect(updatedEntity).toHaveProperty('title', 'Updated Title');
                expect(updatedEntity).toHaveProperty('user', posts[0].user);
            });

            it('should return 404 when attempting to update entity that does not exist', async () => {
                expect.assertions(3);

                const save = await request(app.server()).post('/post').send(posts[1]);
                const entity = save.body.data;
                const remove = await request(app.server()).delete(`/post/${entity._id}`);
                const update = await request(app.server()).patch(`/post/${entity._id}`).send({ title: 'Updated Title' });

                expect(save.status).toEqual(201);
                expect(remove.status).toEqual(200);
                expect(update.status).toEqual(404);
            });

            it('should ignore invalid fields', async () => {
                expect.assertions(6);

                const malformedPost = { title: 'Amazing News!', content: 'Wait until what we have in store for you.', tag: 'blog' };
                const save = await request(app.server()).post('/post').send(posts[1]);
                const entity = save.body.data;
                const update = await request(app.server()).patch(`/post/${entity._id}`).send(malformedPost);
                const updatedEntity = update.body.data[0];
                const remove = await request(app.server()).delete(`/post/${entity._id}`);

                expect(save.status).toEqual(201);
                expect(update.status).toEqual(200);
                expect(remove.status).toEqual(200);

                expect(updatedEntity).toHaveProperty('content', 'Wait until what we have in store for you.');
                expect(updatedEntity).toHaveProperty('title', 'Amazing News!');
                expect(updatedEntity).not.toHaveProperty('tag');
            });
        });
    });
});
