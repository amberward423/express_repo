import express from 'express';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';
import {
  getUser,
  getUserwID,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

import { authorize } from '../../middlewares/auth.js';

const userValidation = [
  body('name').trim().notEmpty(),
  body('username').trim().notEmpty(),
  body('email').trim().isEmail(),
  body('role').trim().notEmpty(),
  body('password').isLength({min: 6}),
];

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(userValidation, validationErrors, postUser);

userRouter.route('/:id').get(authorize,getUserwID).put(authorize,userValidation,validationErrors, putUser).delete(authorize, deleteUser);

export default userRouter;
