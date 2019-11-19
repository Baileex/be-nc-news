const express = require("express");
const apiRouter = express.Router();
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./usersRouter");

apiRouter
  .use("/topics", topicsRouter)
  .use("/users", usersRouter)
  
module.exports = apiRouter;
