import { Router } from 'express';

import auth from './routes/auth';
import users from './routes/users';

export default (): Router => {
  const router = Router();

  auth(router);
  users(router);

  return router;
};
