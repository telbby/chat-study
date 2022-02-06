import express, { Application } from 'express';

import config from './config';
import loadApp from './loaders';

const startServer = async () => {
  const app: Application = express();

  await loadApp(app);
  app.listen(config.port);
};

startServer()
  .then(() => console.log(`Server Run on ${config.port}`))
  .catch(() => {
    console.error('Server Run Failed');
    process.exit(1);
  });
