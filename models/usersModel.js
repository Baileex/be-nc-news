const connection = require("../db/connection");

const fetchUserById = (username) => {
  return connection.select('*').from('users').where({username: username}).returning('*');
};

module.exports = { fetchUserById };
