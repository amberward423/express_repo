import express from 'express';
import {
  getCat,
  getCatwID,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.route('/').get(getCat).post(postCat);
catRouter.route('/:id').get(getCatwID).put(putCat).delete(deleteCat);

export default catRouter;
