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
      if (!inc_votes || inc_votes === NaN) {
        return Promise.reject({
          status: 400,
          msg: "Bad Request"
        });
      }
      if (article.length === 0)
        return Promise.reject({
          status: 404,
          msg: "Not Found"
        });
      else return article;
    });
};

const addNewComment = comment => {
  return connection
    .insert(comment)
    .into("comments")
    .returning("*")
    .then(comment => {
      console.log(comment);
      if (comment.author === null || comment.body === null) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      } else return comment;
    });
};

const fetchComments = (article_id, sort_by, order) => {
  if (sort_by === undefined && order === undefined) {
    sort_by = "created_at";
    order = "desc";
  }
  return connection
    .select("*")
    .from("comments")
    .where({ article_id: article_id })
    .orderBy(sort_by, order)
    .returning("*")
    .then(comments => {
      if (order !== "asc" && order !== "desc") {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      } else if (comments.length === 0) return fetchArticleById(article_id);
      else return comments;
    });
};

const fetchAllArticles = () => {
  return connection
    .select("articles.*", "articles.body")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .returning("*")
    .then(articles => {
      return articles.map(({ body, ...article }) => {
        return { ...article };
      });
    });
};

module.exports = {
  fetchArticleById,
  updateArticleById,
  addNewComment,
  fetchComments,
  fetchAllArticles
};
