const {updateCommentById} = require('../models/commentsModel')

exports.patchCommentById = (req, res, next) => {
  const {inc_votes} = req.body;
  const {comment_id} = req.params;
  updateCommentById(inc_votes, comment_id).then(comment => {
    res.status(202).send({comment})
  })
}