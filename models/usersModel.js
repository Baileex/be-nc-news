const connection = require("../db/connection");

const fetchUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username: username })
    .returning("*")
    .then(user => {
      if (user.length === 0)
        return Promise.reject({
          status: 404,
          msg: "Username not found"
        });
      else return user;
    });
};

module.exports = { fetchUserById };
