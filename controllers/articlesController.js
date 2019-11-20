const {
  fetchArticleById,
  updateArticleById,
  addNewComment,
  fetchComments
} = require("../models/articlesModel");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then(article => {
      res.status(202).send({ article });
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

    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.getAllComments = (req, res, next) => {
  const { article_id } = req.params;
  const {sort_by, order} = req.query;
  console.log(order)
  fetchComments(article_id, sort_by, order).then(comments => {
    res.status(200).send({comments})
  })
  .catch(next);
};
