import express from 'express';
import multer from 'multer';

const upload = multer({dest: 'uploads/'});

import {
  getCat,
  getCatwID,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.route('/').get(getCat).post(upload.single('cat'), postCat);
catRouter.route('/:id').get(getCatwID).put(putCat).delete(deleteCat);

export default catRouter;
