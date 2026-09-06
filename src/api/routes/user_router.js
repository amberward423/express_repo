import express from 'express';

import {
  getUser,
  getUserwID,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

import { authorize } from '../../middlewares/auth.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);

userRouter.route('/:id').get(authorize,getUserwID).put(authorize,putUser).delete(authorize, deleteUser);

export default userRouter;
