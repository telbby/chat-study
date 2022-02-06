import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import AuthService from '../../../services/auth';
import { GuestLoginRequestBody, AdminLoginRequestBody } from '../../../types';

export const handleAdminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userLoginInfo = req.body as AdminLoginRequestBody;

    const authService = Container.get(AuthService);

    const user = await authService.adminLogin(userLoginInfo);
    req.session.user = user;

    res.end();
  } catch (err) {
    next(err);
  }
};

export const handleGuestLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userLoginInfo = req.body as GuestLoginRequestBody;

    const authService = Container.get(AuthService);

    const user = await authService.guestLogin(userLoginInfo.uid);
    req.session.user = user;

    res.end();
  } catch (err) {
    next(err);
  }
};

export const handleLogout = (req: Request, res: Response): void => {
  req.session.destroy(() => req.session);
  res.status(204).end();
};
