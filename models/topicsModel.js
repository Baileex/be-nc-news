const connection = require("../db/connection");

const fetchAllTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .returning("*");
};

module.exports = { fetchAllTopics };
