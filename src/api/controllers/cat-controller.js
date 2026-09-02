import {addCat, findCat, listAll} from '../models/cat-model.js';
const getCat = (req, res) => {
  res.json(listAll());
};

const getCatwID = (req, res) => {
  const cat = findCat(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(400);
  }
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added : , ', result});
  } else {
    res.sendStatus(404);
  }
};

const putCat = (req, res) => {
  res.status(200);

  res.json({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  res.status(200);

  res.json({message: 'Cat item deleted.'});
};
export {getCat, getCatwID, postCat, putCat, deleteCat};
