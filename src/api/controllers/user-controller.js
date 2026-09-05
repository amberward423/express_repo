import {addUser, findUser, listAllUsers, modifyUser, removeUser} from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserwID = async (req, res) => {
  const user = await findUser(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const result = await addUser(req.body);

  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
    const result = await modifyUser({...req.body, user_id: req.params.id});
  res.json({result});
};

const deleteUser = async(req, res) => {
      const result = await removeUser(req.params.id);
  res.json({result});
};

export {getUser, getUserwID, postUser, putUser, deleteUser};
