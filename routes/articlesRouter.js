const express = require("express");
const articlesRouter = express.Router();
const {
  getArticleById,
  patchArticleById,
  postCommentbyId,
  getAllComments,
  getAllArticles,
  postArticle
} = require("../controllers/articlesController");
const { invalidMethods } = require("../error-handling/errors");

articlesRouter.route('/').get(getAllArticles).post(postArticle).all(invalidMethods)

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(invalidMethods)


articlesRouter
  .route("/:article_id/comments")
  .post(postCommentbyId)
  .get(getAllComments)
  .all(invalidMethods)

module.exports = articlesRouter;
