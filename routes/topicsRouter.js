const express = require("express");
const topicsRouter = express.Router();
const { sendAllTopics, postTopic } = require("../controllers/topicsController");
const { invalidMethods } = require("../error-handling/errors");

topicsRouter.route("/").get(sendAllTopics)
.post(postTopic).all(invalidMethods);

module.exports = topicsRouter;
