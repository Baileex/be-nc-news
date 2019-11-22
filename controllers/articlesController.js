const {
  fetchArticleById,
  updateArticleById,
  addNewComment,
  fetchComments,
  fetchAllArticles,
  countArticles,
  createArticle
} = require("../models/articlesModel");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => {
      res.status(200).send({ article: article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article: article });
    })
    .catch(next);
};

exports.postCommentbyId = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  const comment = {
    author: username,
    article_id: article_id,
    body: body
  };
  addNewComment(comment)
    .then(comment => {
      res.status(201).send({ comment: comment });
    })
    .catch(next);
};

exports.getAllComments = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order , limit, p} = req.query;
  fetchArticleById(article_id)
    .then(article => {
      // need fetchComments to resolve before send response to client
      return fetchComments(article_id, sort_by, order, limit, p);
    })
    .then(comments => {
      res.status(200).send({ comments: comments });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic, limit, p } = req.query;
  countArticles(author, topic).then(articleCount => {
    const maxPages = Math.ceil(articleCount / limit);
    if (maxPages === 0) {
      maxPages = 1;
    }
  });
  fetchAllArticles(sort_by, order, author, topic, limit, p)
    .then(({updatedArticles, total_count}) => {
      res.status(200).send({ articles: updatedArticles, total_count: total_count });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  createArticle()
}