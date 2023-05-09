var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
var session = require("express-session");

var pool = require("./models/db");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/admin/login");
var adminRouter = require("./routes/admin/novedades");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* Configuración de express-session */
app.use(
  session({
    secret: "1234",
    cookie: { maxAge: null },
    resave: false,
    saveUninitialized: true,
  })
);

/* Middelware de validación de sesión */
secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error);
  }
};

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin/login", loginRouter);
app.use("/admin/novedades", secured, adminRouter);

// Inicio de las consultas a la base de datos
// SELECT
// pool.query("SELECT * FROM empleados").then(function (resultados) {
//   console.log(resultados);
// });

// INSERT
// var nuevoEmpleado = {
//   nombre: "Natalia",
//   apellido: "Camarano",
//   trabajo: "Programadora",
//   edad: 36,
//   salario: 3000,
//   mail: "natalia@test.com",
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
