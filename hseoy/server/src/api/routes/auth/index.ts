import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { loginValidation } from '../../validation/auth';
import { handleAdminLogin, handleGuestLogin, handleLogout } from './auth.controller';

const authRouter = Router();

export default (router: Router): Router => {
  router.use('/auth', authRouter);

  authRouter.post('/admin', loginValidation, asyncHandler(handleAdminLogin));
  authRouter.post('/guest', asyncHandler(handleGuestLogin));
  authRouter.delete('/', handleLogout);

  return router;
};
