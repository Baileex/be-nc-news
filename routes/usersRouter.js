const express = require("express");
const usersRouter = express.Router();
const { sendUserById } = require("../controllers/usersController");
const { invalidMethods } = require("../error-handling/errors");

usersRouter
  .route("/:username")
  .get(sendUserById)
  .all(invalidMethods);

module.exports = usersRouter;
