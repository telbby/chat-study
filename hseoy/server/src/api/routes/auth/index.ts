import { Router } from 'express';
import { loginValidation } from '../../validation/auth';

import { handleAdminLogin, handleGuestLogin, handleLogout } from './auth.controller';

const authRouter = Router();

export default (router: Router): Router => {
  router.use('/auth', authRouter);

  authRouter.post('/admin', loginValidation, handleAdminLogin);
  authRouter.post('/guest', handleGuestLogin);
  authRouter.delete('/', handleLogout);

  return router;
};
