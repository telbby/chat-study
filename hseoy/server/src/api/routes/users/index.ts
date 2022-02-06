import { Router } from 'express';
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

  userRouter.post('/admin', userCreateValidation, handleCreateAdminUser);
  userRouter.post('/guest', handleCreateGuestUser);

  userRouter.get('/', isAuth, handleGetCurrentUser);
  userRouter.delete('/', isAuth, handleDeleteCurrentUser);

  return router;
};
