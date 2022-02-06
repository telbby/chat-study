import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import isAuth from '../../middlewares/isAuth';
import { userCreateValidation } from '../../validation/user';

import {
  handleGetCurrentUser,
  handleCreateAdminUser,
  handleDeleteCurrentUser,
  handleCreateGuestUser,
} from './users.controller';

const userRouter = Router();

export default (router: Router): Router => {
  router.use('/users', userRouter);

  userRouter.post('/admin', userCreateValidation, asyncHandler(handleCreateAdminUser));
  userRouter.post('/guest', asyncHandler(handleCreateGuestUser));

  userRouter.get('/', isAuth, handleGetCurrentUser);
  userRouter.delete('/', isAuth, asyncHandler(handleDeleteCurrentUser));

  return router;
};
