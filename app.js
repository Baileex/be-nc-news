const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  invalidMethods,
  serverError,
  psqlErrors,
  customErrors
} = require("./error-handling/errors");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Page not found" });
});

//custom errors
app.use(customErrors);

// psql errors
app.use(psqlErrors);

//invalid method
app.use(invalidMethods);

// server error
app.use(serverError);

module.exports = app;
