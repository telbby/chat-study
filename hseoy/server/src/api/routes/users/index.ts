import { Router } from 'express';

import { userTestValidation } from '../../validation/user';
import { handleUserTest } from './users.controller';

const router = Router();

router.get('/', userTestValidation, handleUserTest);

export default router;
