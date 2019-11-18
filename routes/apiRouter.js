const express = require('express');
const apiRouter = express.Router();
const {articlesRouter} = require('./articlesRouter');

apiRouter.use('/', () => {
  console.log('At apiRouter!')
})

module.exports = apiRouter;