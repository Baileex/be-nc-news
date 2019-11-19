const express = require("express");
const articlesRouter = express.Router();
const {getArticleById, patchArticleById} = require('../controllers/articlesController')

articlesRouter.route("/:article_id").get(getArticleById).patch(patchArticleById)

module.exports = articlesRouter;