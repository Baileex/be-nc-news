const express = require("express");
const topicsRouter = express.Router();
const {sendAllTopics} = require('../controllers/topicsController')
const { invalidMethods } = require("../error-handling/errors");

topicsRouter.route("/").get(sendAllTopics).all(invalidMethods);

module.exports = topicsRouter;
