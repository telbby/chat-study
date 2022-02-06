import { NextFunction, Request, Response } from 'express';
import { idValidator, pwValidator } from '@telbby/validation';

import ErrorResponse from '../../utils/error-response';
import { AdminLoginRequestBody } from '../../types';

export const userCreateValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const { userId = '', password = '' } = req.body as AdminLoginRequestBody;

  const [isIdValid, idWarningMessage] = idValidator(userId);
  const [isPwValid, pwWarningMessage] = pwValidator(password);

  if (!isIdValid || !isPwValid) {
    throw new ErrorResponse({
      statusCode: 400,
      message: idWarningMessage || pwWarningMessage,
    });
  }

  next();
};
