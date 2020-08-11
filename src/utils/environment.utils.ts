import { cleanEnv, port, str } from 'envalid';

export class EnvironmentUtils {
    public static validate(): void {
        cleanEnv(process.env, {
            MONGO_PORT: port(),
            NODE_ENV: str(),
            PORT: port(),
            REDIS_PORT: port()
        });
    }
}
