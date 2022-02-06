import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import UserService from '../../../services/user';

export const handleUserTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.query;

    const userServiceInstance = Container.get(UserService);
    const user = await userServiceInstance.getUser(Number(id));

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
