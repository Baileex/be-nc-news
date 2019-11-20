const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Page not found" });
});

//custom errors
app.use((err, req, res, next) => {
  //console.log(err)
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

// psql errors
app.use((err, req, res, next) => {
  //console.log(err);
  const error400Ref = {
    "22P02": "Bad Request - invalid value",
    "23502": "Bad Request - Required input not provided",
    "42703": "Bad Request - Cannot query something that does not exist"
  };
  const error404Ref = {
    "23503": "ID Not Found",
    "42P01": "Not Found"
  };
  if (error400Ref[err.code]) {
    if (err.detail) {
      res.status(400).send({ msg: `${error400Ref[err.code]} - ${err.detail}` });
    } else res.status(400).send({ msg: error400Ref[err.code] });
  } else if (error404Ref[err.code]) {
    if (err.detail) {
      res.status(404).send({ msg: `${error404Ref[err.code]} - ${err.detail}` });
    } else res.status(404).send({ msg: error404Ref[err.code] });
  } else next(err);
});


// server error
app.use((err, req, res, next) => {
  //console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
