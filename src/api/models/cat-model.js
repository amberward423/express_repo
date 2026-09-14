import promisePool from '../../utils/database.js';



const listAll = async () => {
  console.log(
    'DB settings:',
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_NAME
  );
  const [rows] = await promisePool.query('SELECT * ,wsk_users.name FROM wsk_cats INNER JOIN wsk_users ON wsk_cats.owner=wsk_users.user_id');
');
  console.log('rows', rows);
  return rows;
};

const findCat = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  console.log(rows, 'rows');

  if (rows.length === 1) {
    return rows[0];
  } else return false;
};

const findCatbyUser = async (id) =>{
   const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [id]
  );
  return rows;
}

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const [result] = await promisePool.execute(
    'INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)',
    [cat_name, weight, owner, filename, birthdate]
  );
  return {cat_id: result.insertId};
};
const modifyCat = async (cat) => {
  const {cat_id, cat_name, weight, owner, filename, birthdate} = cat;
  const [result] = await promisePool.execute(
    `UPDATE wsk_cats
     SET cat_name = ?,
         weight = ?,
         owner = ?,
         filename = ?,
         birthdate = ?
     WHERE cat_id = ?`,
    [cat_name, weight, owner, filename, birthdate, cat_id]
  );
  return result;
};

const removeCat = async (id) => {
  const [result] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id]
  );

  if (result.affectedRows === 0) {
    return false;
  } else {
    return true;
  }
};

export {listAll, findCat, addCat, modifyCat, removeCat, findCatbyUser};
