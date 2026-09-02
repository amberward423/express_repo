import express from 'express';
import catRouter from './routes/cat_router.js';
import userRouter from './routes/user_router.js';

const router = express.Router();

router.use('/cats', catRouter);
router.use('/users', userRouter);

export default router;
