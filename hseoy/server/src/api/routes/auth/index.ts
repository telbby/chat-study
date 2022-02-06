import { Router } from 'express';

import { handleAuthTest } from './auth.controller';

const router = Router();

router.get('/', handleAuthTest);

export default router;
