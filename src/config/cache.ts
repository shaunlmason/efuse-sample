import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config();

const { REDIS_URL = `redis://localhost:${process.env.REDIS_PORT}` } = process.env;

const POST_KEY_PREFIX: string = 'efuse-post-';
const USER_KEY_PREFIX: string = 'efuse-user-';
const USER_POSTS_KEY_PREFIX = 'efuse-user-posts-';

const cache = redis.createClient({
    host: 'redis',
    url: REDIS_URL
});

const init = async () =>
    new Promise((resolve, reject) => {
        cache.on('connect', () => {
            console.info(`📚\xa0\xa0 redis  connected on port ${process.env.REDIS_PORT}`);
            resolve(cache);
        });

        cache.on('error', (error: Error) => {
            console.error(`💣\xa0\xa0 [ERROR] redis - ${error.message || error}`);
            reject(error);
        });
    });

export { init, cache, POST_KEY_PREFIX, USER_KEY_PREFIX, USER_POSTS_KEY_PREFIX };
