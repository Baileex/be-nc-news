const { fetchUserById } = require("../models/usersModel");

exports.sendUserById = (req, res, next) => {
  const { username } = req.params;
  fetchUserById(username)
    .then(user => {
      res.status(200).send({ user: user });
    })
    .catch(next);
};
