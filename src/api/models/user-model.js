const userItems = [
  {
    user_id: 3609,
    name: 'Amber',
    username: 'Amber',
    email: 'amber@email.com',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3618,
    name: 'John Doe',
    username: 'John Doe',
    email: 'johndoe@email.com',
    role: 'user',
    password: 'password',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUser = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;

  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });

  return {user_id: newId};
};

export {listAllUsers, findUser, addUser};
