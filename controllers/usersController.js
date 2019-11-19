const { fetchUserById } = require("../models/usersModel");

exports.sendUserById = (req, res, next) => {
  const { username } = req.params;
  fetchUserById(username)
    .then(user => {
      if (user.length === 0) res.status(404).send({ msg: 'Username not found' });
      else res.status(200).send({ user });
    })
    .catch(next);
};
