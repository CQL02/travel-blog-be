var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var dotenv = require("dotenv");

dotenv.config();
var usersRouter = require("./routes/users");
var blogRouter = require("./routes/blog");
var statsRouter = require("./routes/stats");
var viewRouter = require("./routes/view");
var authRouter = require("./routes/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.query());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/users", usersRouter);
app.use("/blog", blogRouter);
app.use("/stats", statsRouter);
app.use("/view", viewRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// var { login } = require("./db/auth");
// async function testData() {
//   // const userData = await addUser(
//   //   "ali",
//   //   "C:/Users/User/Desktop/WIF2003 WP/Assignment/travel-blog-be/_MG_0286.JPG",
//   //   "123456",
//   //   "ali@gmail.com"
//   // );

//   const userData = await login("ali", "123456");

//   // const userData = await hitLike(1, 6);
//   console.log(userData);
// }
// testData();

module.exports = app;
