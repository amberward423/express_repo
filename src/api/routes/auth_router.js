import express from 'express';

import {login} from '../controllers/user-controller.js';

import {getMe} from '../controllers/user-controller.js';

import { authorize } from '../../middlewares/auth.js';

const authRouter= express.Router();

authRouter.route('/login').post(login);

authRouter.route('/me').get(authorize,getMe);

export default authRouter;