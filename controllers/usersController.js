const {
  fetchUserById,
  createNewUser,
  fetchAllUsers
} = require("../models/usersModel");

exports.sendUserById = (req, res, next) => {
  const { username } = req.params;
  fetchUserById(username)
    .then(user => {
      res.status(200).send({ user: user });
    })
    .catch(next);
};
exports.postNewUser = (req, res, next) => {
  const { body } = req;
  createNewUser(body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers().then(users => {
    res.status(200).send({ users });
  });
};
