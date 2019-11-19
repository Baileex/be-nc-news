const express = require("express");
const articlesRouter = express.Router();
const {
  getArticleById,
  patchArticleById,
  postCommentbyId
} = require("../controllers/articlesController");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .post(postCommentbyId)

module.exports = articlesRouter;
