const express = require("express");
const commentsRouter = express.Router();
const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/commentsController");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Invalid Method" });
  });

module.exports = commentsRouter;
