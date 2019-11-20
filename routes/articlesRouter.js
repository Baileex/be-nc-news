const express = require("express");
const articlesRouter = express.Router();
const {
  getArticleById,
  patchArticleById,
  postCommentbyId,
  getAllComments
} = require("../controllers/articlesController");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)

  articlesRouter.route("/:article_id/comments").post(postCommentbyId).get(getAllComments)


module.exports = articlesRouter;
