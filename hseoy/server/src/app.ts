import express, { Application } from 'express';

import config from './config';
import loadApp from './loaders';
import { CreatedUserInfo } from './types';

declare module 'express-session' {
  interface SessionData {
    user: CreatedUserInfo;
  }
}

const startServer = async () => {
  const app: Application = express();

  await loadApp(app);
  app.listen(config.port);
};

startServer()
  .then(() => console.log(`Server Run on ${config.port}`))
  .catch(e => {
    console.error('Server Run Failed');
    console.error(e);
    process.exit(1);
  });
