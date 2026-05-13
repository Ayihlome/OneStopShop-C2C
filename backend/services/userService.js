const users = [];
let idCounter = 1;

exports.list = () => users;

exports.findById = (id) => users.find((u) => String(u.id) === String(id));

exports.create = (data) => {
  const user = { id: idCounter++, ...data };
  users.push(user);
  return user;
};
