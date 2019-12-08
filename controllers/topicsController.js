const { fetchAllTopics, createTopic } = require("../models/topicsModel");


exports.sendAllTopics = (req, res, next) => {
  fetchAllTopics().then(topics => {
    res.status(200).send({topics});
  })
  .catch(next);
}

exports.postTopic = (req, res, next) => {
  const { body } = req;
  createTopic(body).then(topic => {
    res.status(201).send({topic})
  })
  .catch(next)
}