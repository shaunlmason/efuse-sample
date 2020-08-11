import dotenv from 'dotenv';

import { ApiApplication } from './app';
import { EnvironmentUtils } from './utils/environment.utils';
import { IndexRoutes } from './routes/index.routes';
import { PostRoutes } from './routes/post.routes';
import { UserRoutes } from './routes/user.routes';

dotenv.config();
EnvironmentUtils.validate();

const app = new ApiApplication([new IndexRoutes(), new UserRoutes(), new PostRoutes()]);

app.listen();
