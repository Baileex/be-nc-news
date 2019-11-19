const {fetchAllTopics} = require('../models/topicsModel')


exports.sendAllTopics = (req, res, next) => {
  fetchAllTopics().then(topics => {
    // console.log({topics});
    res.status(200).send({topics});
  })
  .catch(next);
}