const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");

//const db = require('./util/database');

const app = express();


// const mysql = require("mysql");
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "csie0000",
//   database: "dbdemo"
// });

// con.connect(function(err) {
//   if (err) console.log(err);
//   else console.log("MySQL connection successful");
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(function(req, res, next) {
//   req.con = db;
//   next();
// });

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
