import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import ErrorResponse from '../../utils/error-response';

export const loginValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    userId: Joi.string().required().empty('').messages({
      'any.required': `아이디를 입력해주세요`,
    }),
    password: Joi.string().required().empty('').messages({
      'any.required': `비밀번호를 입력해주세요`,
    }),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    throw new ErrorResponse({
      statusCode: 400,
      message: validationResult.error.message,
    });
  }

  next();
};
