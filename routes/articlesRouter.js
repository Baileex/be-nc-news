const express = require("express");
const articlesRouter = express.Router();

articlesRouter.route('/').get(()=> {
  console.log('At articles router...')
})

module.exports = articlesRouter;