const connection = require("../db/connection");

const fetchAllTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .returning("*");
};

const createTopic = body => {
  return connection
    .insert(body)
    .into("topics")
    .returning("*")
    .then(([topic]) => {
      if (topic.slug === null || topic.description === null) {
        return Promise.reject({
          status: 400,
          msg: "Bad Request - Required input not provided"
        });
      } else return topic;
    });
};

module.exports = { fetchAllTopics, createTopic };
