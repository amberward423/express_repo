import promisePool from '../../utils/database.js';
import bcrypt from 'bcrypt';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const findUser = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );

  if (rows.length === 1) {
    return rows[0];
  } else return false;
};
const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );

  if (rows.length === 1) {
    return rows[0];
  } else return false;
};
const addUser = async (user) => {
  const {name, username, email, role, password} = user;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const [result] = await promisePool.execute(
    'INSERT INTO wsk_users (username, name, password, email, role) VALUES (?, ?, ?, ?, ?)',
    [username, name, hashedPassword, email, role]
  );

  return {user_id: result.insertId};
};

const modifyUser = async (user) => {
  const {user_id, username, email, role, password, name} = user;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const [result] = await promisePool.execute(
    `UPDATE wsk_users
     SET username = ?,
         email = ?,
         role = ?,
         password = ?,
         name = ?
     WHERE user_id = ?`,
    [username, email, role, hashedPassword, name, user_id]
  );

  return result;
};
const removeUser = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    const [cat_result] = await connection.execute(
      'DELETE FROM wsk_cats WHERE owner = ?',
      [id]
    );

    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );

    await connection.commit();

    if (result.affectedRows === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export {
  listAllUsers,
  findUser,
  addUser,
  modifyUser,
  removeUser,
  findUserByUsername,
};
