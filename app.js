const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter'); 


app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({msg: "Page not found"})
})

//custom errors
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

// 400 error handling
app.use((err, req, res, next) => {
  const codes400 = ["42703"];
  const codes406 = ["22P02"];
  if (codes400.includes(err.code)) {
    res.status(400).send({ msg: "Bad Request!" });
  }
  if (codes406.includes(err.code)) {
    res.status(406).send({ msg: "Not an acceptable id" });
  }
  next(err);
});


// const errorHandler404 = 
app.use((err, req, res, next) => {
  //console.log(err);
  const codes = ["404"];
  if (codes.includes(err.code) || codes.includes(err.status)) {
    res.status(404).send({ msg: "Page not found" });
  } else {
    next(err);
  }
});

// const errorHandler400 = 
app.use((err, req, res, next) => {
  //console.log(err)
  const codes = ["400"];
  if (codes.includes(err.code) || codes.includes(err.status)) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

// wrong method
app.use((req, res) => {
  res.status(405).send({ msg: "Method not allowed" });
});

// server error
app.use((err, req, res, next) => {
  //console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});



module.exports = app;
