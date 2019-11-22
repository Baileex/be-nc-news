const {fetchAllTopics} = require('../models/topicsModel')


exports.sendAllTopics = (req, res, next) => {
  fetchAllTopics().then(topics => {
    res.status(200).send({topics});
  })
  .catch(next);
}