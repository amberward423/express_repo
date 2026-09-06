import express from 'express';
import multer from 'multer';
import {createThumbnail} from '../../middlewares/upload.js';
import { authorize } from '../../middlewares/auth.js';
const upload = multer({dest: 'upload/'});

import {
  getCat,
  getCatwID,
  postCat,
  putCat,
  deleteCat,
  getCatwUser,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('cat'), createThumbnail, postCat);

catRouter.route('/user/:id')
.get(getCatwUser);

catRouter.route('/:id').get(getCatwID).put(authorize, putCat).delete(authorize, deleteCat);

export default catRouter;
