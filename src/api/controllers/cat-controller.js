import {
  addCat,
  findCat,
  listAll,
  removeCat,
  findCatbyUser,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAll());
};

const getCatwID = async (req, res) => {
  const cat = await findCat(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(400);
  }
};

const getCatwUser = async (req, res) => {
  const cat = await findCatbyUser(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(400);
  }
};

const postCat = async (req, res) => {
  console.log(req.body, 'req.body');
  console.log(req.file, 'req.file');

  const result = await addCat({...req.body, filename: req.file.filename});
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added : , ', result});
  } else {
    res.sendStatus(404);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat({...req.body, cat_id: req.params.id});
  res.json({result});
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);
  res.json({result});
};
export {getCat, getCatwID, postCat, putCat, deleteCat, getCatwUser};
