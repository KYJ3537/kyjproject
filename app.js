const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { localsMiddleware } = require("./middlewares");
const routes = require("./routes");
const globalRouter = require("./routers/globalRouter");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/static", express.static((__dirname, "static")));
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
//
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});
exports.starList = [];
module.exports = app;
