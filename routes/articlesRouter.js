const express = require("express");
const articlesRouter = express.Router();
const {
  getArticleById,
  patchArticleById,
  postCommentbyId,
  getAllComments,
  getAllArticles
} = require("../controllers/articlesController");

articlesRouter.route('/').get(getAllArticles)

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentbyId)
  .get(getAllComments);

module.exports = articlesRouter;
