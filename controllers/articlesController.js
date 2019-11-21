const {
  fetchArticleById,
  updateArticleById,
  addNewComment,
  fetchComments,
  fetchAllArticles,
  checkifReal
} = require("../models/articlesModel");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => {
      //console.log({article: article})
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
  let comment = {
    author: username,
    article_id: article_id,
    body: body
  };
  addNewComment(comment)
    .then(comment => {
      // console.log({ comment: comment });
      res.status(201).send({ comment: comment });
    })
    .catch(next);
};

exports.getAllComments = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  fetchArticleById(article_id).then(article => {
    const comments = fetchComments(article_id, sort_by, order)
    return Promise.all([comments])
  })
  .then(([comments]) => {
      console.log(comments)
      res.status(200).send({ comments: comments });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchAllArticles(sort_by, order, author, topic)
    .then(articles => {
      res.status(200).send({ articles: articles });
    })
    .catch(next);
};
