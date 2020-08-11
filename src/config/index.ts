import { init as initCache } from './cache';
import { init as initDb } from './mongo';

export const initDependencies = async () => {
    await initCache();
    await initDb();
};
