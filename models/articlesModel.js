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
    .then(([comment]) => {
      if (comment.author === null || comment.body === null) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      } else return comment;
    });
};

const fetchComments = (article_id, sort_by, order, limit = 10, p = 1) => {
  const offset = (p - 1) * limit;
  return connection
    .select("*")
    .from("comments")
    .offset(offset)
    .limit(limit)
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

const fetchAllArticles = (sort_by, order, author, topic, limit = 10, p = 1) => {
  const offset = (p - 1) * limit;
  return connection
    .select("articles.*", "articles.body")
    .from("articles")
    .offset(offset)
    .limit(limit)
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
       countArticles(author, topic).then(articleCount => {
         let maxPages = Math.ceil(articleCount / limit);
         if (maxPages === 0) {
           maxPages = 1;
         }
       });
      const totalCount = countArticles(author, topic)
      const validOrder = ["asc", "desc"].includes(order);
      const realAuthor = author
        ? checkifReal(author, "users", "username")
        : null;
      const realTopic = topic ? checkifReal(topic, "topics", "slug") : null;
      if (order && !validOrder) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      } else return Promise.all([realAuthor, realTopic, articles, totalCount]);
    })
    .then(([realAuthor, realTopic, articles, totalCount]) => {
      if (realAuthor === false) {
        return Promise.reject({ status: 404, msg: "Author Not Found" });
      } else if (realTopic === false) {
        return Promise.reject({ status: 404, msg: "Topic Not Found" });
      } else {
        const updatedArticles = articles.map(({ body, ...article }) => {
          return { ...article };
        });
        return {updatedArticles, total_count: totalCount}
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

const countArticles = (author, topic) => {
 return connection
    .select("*")
    .from("articles")
    .modify(selector => {
      if (author) {
        selector.where("articles.author", "=", author);
      }
      if (topic) {
        selector.where("articles.topic", "=", topic);
      }
    })
    .then(articles =>
       articles.length);
}; 

// const createArticle = (article) => {
//   return connection
//     .insert(article)
//     .into("articles")
//     .returning("*")
//     .then(([comment]) => {
//       if (comment.author === null || comment.body === null) {
//         return Promise.reject({ status: 400, msg: "Bad Request" });
//       } else return comment;
//     });
// };
// }


module.exports = {
  fetchArticleById,
  updateArticleById,
  addNewComment,
  fetchComments,
  fetchAllArticles,
  checkifReal,
  countArticles,
  createArticle
};
