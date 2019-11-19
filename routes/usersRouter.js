const express = require("express");
const usersRouter = express.Router();
const { sendUserById } = require("../controllers/usersController");

usersRouter
  .route("/:username")
  .get(sendUserById)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Invalid Method" });
  });

module.exports = usersRouter;
