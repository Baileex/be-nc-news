const express = require("express");
const usersRouter = express.Router();
const {
  sendUserById,
  postNewUser,
  getAllUsers
} = require("../controllers/usersController");
const { invalidMethods } = require("../error-handling/errors");

usersRouter
  .route("/")
  .get(getAllUsers)
  .post(postNewUser)
  .all(invalidMethods);

usersRouter
  .route("/:username")
  .get(sendUserById)
  .all(invalidMethods);

module.exports = usersRouter;
