const connection = require("../db/connection");

const fetchArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .where({ "articles.article_id": article_id })
    .returning("*")
    .then(article => {
      if (article.length === 0)
        return Promise.reject({
          status: 404,
          msg: "Not Found"
        });
      else return article;
    });
};

const updateArticleById = (article_id, inc_votes) => {
  return connection
    .increment("votes", inc_votes)
    .into("articles")
    .where({ article_id: article_id })
    .returning("*")
    .then(article => {
      if (article.length === 0)
        return Promise.reject({
          status: 404,
          msg: "Not Found"
        });
      else return article;
    });
};

const addNewComment = (comment) => {
  return connection
    .insert(comment)
    .into("comments")
    .returning("*");
};

module.exports = { fetchArticleById, updateArticleById, addNewComment };
