const {updateCommentById, removeComment} = require('../models/commentsModel')

exports.patchCommentById = (req, res, next) => {
  const {inc_votes} = req.body;
  const {comment_id} = req.params;
  updateCommentById(inc_votes, comment_id).then(comment => {
    res.status(200).send({comment})
  })
  .catch(next)
}

exports.deleteCommentById = (req, res, next) => {
  const {comment_id} = req.params;
  removeComment(comment_id).then(()=> {
    res.sendStatus(204)
  }).catch(next)
}