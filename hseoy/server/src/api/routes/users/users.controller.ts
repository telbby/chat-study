import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { commonError } from '../../../constants/error';
import UserService from '../../../services/user';
import { CreateUserRequestBody } from '../../../types';
import ErrorResponse from '../../../utils/error-response';

export const handleGetCurrentUser = (req: Request, res: Response): void => {
  res.json(req.session.user);
};

export const handleDeleteCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userServiceInstance = Container.get(UserService);
    const currentUser = req.session.user;

    if (!currentUser?.userId && currentUser?.permission === 'ADMIN') {
      throw new ErrorResponse(commonError.unauthorized);
    }

    if (currentUser?.permission === 'ADMIN') {
      await userServiceInstance.deleteAdminUser(currentUser.userId ?? '');
    } else if (currentUser?.permission === 'GUEST') {
      await userServiceInstance.deleteGuestUser(currentUser.uid ?? '');
    }

    req.session.destroy(() => req.session);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export const handleCreateAdminUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userInfoToCreate = req.body as CreateUserRequestBody;

    const userServiceInstance = Container.get(UserService);

    const createdUserInfo = await userServiceInstance.createAdminUser(userInfoToCreate);

    res.status(201).json(createdUserInfo);
  } catch (e) {
    next(e);
  }
};

export const handleCreateGuestUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userServiceInstance = Container.get(UserService);

    const createdUserInfo = await userServiceInstance.createGuestUser();

    res.status(201).json(createdUserInfo);
  } catch (e) {
    next(e);
  }
};
