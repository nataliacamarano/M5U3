var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
var pool = require("./models/db");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Inicio de las consultas a la base de datos
// SELECT
// pool.query("SELECT * FROM empleados").then(function (resultados) {
//   console.log(resultados);
// });

// INSERT
// var nuevoEmpleado = {
//   nombre: "Mateo",
//   apellido: "Gutierrez",
//   trabajo: "Programador",
//   edad: 30,
//   salario: 1000,
//   mail: "mateo@test.com",
// };

// pool
//   .query("INSERT INTO empleados SET ?", [nuevoEmpleado])
//   .then(function (resultados) {
//     console.log(resultados);
//   });

// UPDATE
// var idEmpleado = 1;
// var nuevoSalario = 2000;
// pool
//   .query("UPDATE empleados SET salario = ? WHERE id_emp = ?", [
//     nuevoSalario,
//     idEmpleado,
//   ])
//   .then(function (resultados) {
//     console.log(resultados);
//   });

// DELETE
// var idEmpleado = 1;
// pool
//   .query("DELETE FROM empleados WHERE id_emp = ?", [idEmpleado])
//   .then(function (resultados) {
//     console.log(resultados);
//   });

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

module.exports = app;