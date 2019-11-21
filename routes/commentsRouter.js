const express = require("express");
const commentsRouter = express.Router();
const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/commentsController");
const {invalidMethods} = require('../error-handling/errors')

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all((invalidMethods));

module.exports = commentsRouter;
