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
    .then(([article]) => {
      if (!article)
        return Promise.reject({
          status: 404,
          msg: "Not Found"
        });
      else return article;
    });
};

const updateArticleById = (article_id, inc_votes = 0) => {
  return connection
    .increment("votes", inc_votes)
    .into("articles")
    .where({ article_id: article_id })
    .returning("*")
    .then(([article]) => {
      if (!article)
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
    .then(([{ article_id, ...comment }]) => {
      //console.log(comment);
      if (comment.author === null || comment.body === null) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      } else return { ...comment };
    });
};

const fetchComments = (article_id, sort_by, order) => {
  return connection
    .select("*")
    .from("comments")
    .where({ article_id: article_id })
    .orderBy(sort_by || "created_at", order || "desc")
    .returning("*")
    .then(comments => {
      const validOrder = ["asc", "desc"].includes(order);
      if (order && !validOrder)
        return Promise.reject({ status: 400, msg: "Bad Request" });

      return comments;
    });
};

const fetchAllArticles = (sort_by, order, author, topic) => {
  return connection
    .select("articles.*", "articles.body")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(filter => {
      if (author) filter.where({ "articles.author": author });
      if (topic) filter.where({ "articles.topic": topic });
    })
    .returning("*")
    .then(articles => {
      const validOrder = ["asc", "desc"].includes(order);
      const realAuthor = author
        ? checkifReal(author, "users", "username")
        : null;
      const realTopic = topic ? checkifReal(topic, "topics", "slug") : null;
      if (order && !validOrder) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      } else return Promise.all([realAuthor, realTopic, articles]);
    })
    .then(([realAuthor, realTopic, articles]) => {
      if (realAuthor === false) {
        return Promise.reject({ status: 404, msg: "Author Not Found" });
      } else if (realTopic === false) {
        return Promise.reject({ status: 404, msg: "Topic Not Found" });
      } else {
        return articles.map(({ body, ...article }) => {
          return { ...article };
        });
      }
    });
};
const checkifReal = (query, table, column) => {
  return connection
    .select("*")
    .from(table)
    .where(column, query)
    .then(row => {
      if (row.length === 0) return false;
      else return true;
    });
};

const checkIfArticle = article_id => {
  return connection
    .select(article_id)
    .from("articles")
    .where({ article_id: article_id });
};
module.exports = {
  fetchArticleById,
  updateArticleById,
  addNewComment,
  fetchComments,
  fetchAllArticles,
  checkifReal,
  checkIfArticle
};
