const express = require("express");
const apiRouter = express.Router();
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./usersRouter");
const articlesRouter = require("./articlesRouter");
const commentsRouter = require("./commentsRouter");
const endpointsJSON = require("../endpoints.json");
const { invalidMethods } = require("../error-handling/errors");

apiRouter
  .route("/")
  .get((req, res) => res.status(200).send(endpointsJSON)).all(invalidMethods)

apiRouter
  .use("/topics", topicsRouter)
  .use("/users", usersRouter)
  .use("/articles", articlesRouter)
  .use("/comments", commentsRouter)
  .all(invalidMethods);
module.exports = apiRouter;
