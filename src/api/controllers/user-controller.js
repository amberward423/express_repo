import {
  addUser,
  findUser,
  listAllUsers,
  modifyUser,
  removeUser,
  findUserByUsername,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
const getMe = async (req, res) => {
  res.json(res.locals.user);
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
const login = async (req, res) => {
  const {username, password} = req.body;
  const user = await findUserByUsername(username);
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch === true) {
      const payload = {
        user_id: user.user_id,
        role: user.role,
        email: user.email,
        name: user.name,
        username: user.username,
      };
      const options = {
        expiresIn: '24h',
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, options);

      res.json({message: 'Success', token, user: payload});
    } else {
      res.status(403).json({message: 'Invalid Credentials'});
    }
  } else {
    res.status(403).json({message: 'Invalid Credentials'});
  }
};
const putUser = async (req, res) => {
  if (res.locals.user.user_id == Number(req.params.id) || res.locals.user.role === 'admin'){
  const result = await modifyUser({...req.body, user_id: req.params.id});
  res.json({result});
  }
  else{
    res.status(403).json({message: 'Forbidden'});
  }
};

const deleteUser = async (req, res) => {
    if (res.locals.user.user_id == Number(req.params.id) || res.locals.user.role === 'admin'){
    const result = await removeUser(req.params.id);
  res.json({result});
}else{
    res.status(403).json({message: 'Forbidden'});
  }
};

export {getUser, getUserwID, postUser, putUser, deleteUser, login, getMe};
