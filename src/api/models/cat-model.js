const catItems = [
  {
    cat_id: 3461,
    cat_name: 'Walter Phillip',
    birthdate: '05.07.2020',
    weight: 6,
    owner: 'Amber',
    filename: 'https://loremflickr.com/320/240/cat',
  },
  {
    cat_id: 3452,
    cat_name: 'Chevy',
    birthdate: '08.08.2025',
    weight: 6,
    owner: 'Amber',
    filename: 'https://loremflickr.com/320/240/cat',
  },
];

const listAll = () => {
  return catItems;
};

const findCat = (id) => {
  return catItems.find((item) => item.cat_id == id);
};

const addCat = (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const new_id = catItems[0].cat_id + 1;
  catItems.unshift({
    cat_id: new_id,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  return {cat_id: new_id};
};

export {listAll, findCat, addCat};
