const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter'); 


app.use(express.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

// const errorHandler404 = 
app.use((err, req, res, next) => {
  console.log(err);
  const codes = ["404"];
  if (codes.includes(err.code) || codes.includes(err.status)) {
    res.status(404).send({ msg: "Page not found" });
  } else {
    next(err);
  }
});

// const errorHandler400 = 
app.use((err, req, res, next) => {
  const codes = ["400"];
  if (codes.includes(err.code) || codes.includes(err.status)) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

app.all('/*', (req, res, next) => {
  res.status(404).send({msg: "Page not found"})
})

module.exports = app;
