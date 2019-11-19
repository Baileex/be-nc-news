const express = require("express");
const topicsRouter = express.Router();
const {sendAllTopics} = require('../controllers/topicsController')

topicsRouter.route("/").get(sendAllTopics).all((req, res, next) => {
  res.status(405).send({ msg: "Invalid Method"});
});

module.exports = topicsRouter;
