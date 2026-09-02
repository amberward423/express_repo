import express from 'express';

import {
  getUser,
  getUserwID,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);

userRouter.route('/:id').get(getUserwID).put(putUser).delete(deleteUser);

export default userRouter;
