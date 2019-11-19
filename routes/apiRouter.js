const express = require("express");
const apiRouter = express.Router();
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./usersRouter");
const articlesRouter = require("./articlesRouter");

apiRouter
  .use("/topics", topicsRouter)
  .use("/users", usersRouter)
  .use("/articles", articlesRouter)
  
module.exports = apiRouter;
