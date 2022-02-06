import { Request, Response, NextFunction } from 'express';
import { commonError } from '../../constants/error';
import ErrorResponse from '../../utils/error-response';

const isAuth = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.session.user) {
    return next();
  }
  return next(new ErrorResponse(commonError.unauthorized));
};

export default isAuth;
