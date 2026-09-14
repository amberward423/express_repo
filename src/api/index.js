import express from 'express';
import catRouter from './routes/cat_router.js';
import userRouter from './routes/user_router.js';
import authRouter from './routes/auth_router.js';

const router = express.Router();

router.use('/cats', catRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
