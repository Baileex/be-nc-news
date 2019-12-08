const connection = require("../db/connection");

const fetchUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where({ username: username })
    .returning("*")
    .then(([user]) => {
      if (!user)
        return Promise.reject({
          status: 404,
          msg: "Username not found"
        });
      else return user;
    });
};

const createNewUser = user => {
  return connection
    .insert(user)
    .into("users")
    .returning("*")
    .then(([user]) => user);
}

const fetchAllUsers = () => {
  return connection
    .select("*")
    .from("users")
    .returning("*");
};

module.exports = { fetchUserById, createNewUser, fetchAllUsers };
