import { Router } from 'express';

import auth from './routes/auth';
import users from './routes/users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

export default router;
