const connection = require("../db/connection");

const updateCommentById = (inc_votes = 0, comment_id) => {
  return connection
    .increment("votes", inc_votes)
    .into("comments")
    .where({ comment_id: comment_id })
    .returning("*")
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({ status: 404, msg: "Comment ID Not Found" });
      } else return comment;
    });
};

const removeComment = comment_id => {
  return connection
    .delete("*")
    .from("comments")
    .where({ comment_id: comment_id })
    .then(message => {
      if (message.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Comment ID Not Found"
        });
      } else return "Comment Deleted";
    });
};



module.exports = { updateCommentById, removeComment };
