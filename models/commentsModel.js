const connection = require("../db/connection");

const updateCommentById = (inc_votes, comment_id ) => {
  return connection
    .increment("votes", inc_votes)
    .into("comments")
    .where({ comment_id: comment_id }).returning('*')
}




module.exports = { updateCommentById };