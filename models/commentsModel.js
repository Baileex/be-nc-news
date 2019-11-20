const connection = require("../db/connection");

const updateCommentById = (inc_votes, comment_id ) => {
  return connection
    .increment("votes", inc_votes)
    .into("comments")
    .where({ comment_id: comment_id }).returning('*').then(comment => {
      console.log(comment);
     if (comment.length === 0) {
       return Promise.reject({status: 404, msg: 'Comment ID Not Found'})
     } else return comment
    })
}




module.exports = { updateCommentById };