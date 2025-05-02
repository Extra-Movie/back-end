// #region Requires
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const RegisterRoutes = require("./Routes/Register.Routes");
const LoginRoutes = require("./Routes/Login.Routes");
const AdminRoutes = require("./Routes/Admin.Routes");
const cookieParser = require("cookie-parser");

//#endregion

// #region Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//#endregion

//#region Routes

// #region Reister
app.use("/api/register", RegisterRoutes);
//#endregion

// #region Reister
app.use("/api/login", LoginRoutes);
//#endregion

// #region Admin
app.use("/api/admin", AdminRoutes);
//#endregion

//#endregion

// #region Connect To Data Base
mongoose
  .connect("mongodb://localhost:27017/ExtraMovie")
  .then(() => console.log("Data Base Extra Movie Connected"))
  .catch(() => console.log("Failed to Connect"));
//#endregion

// #region not found middleware
app.all("*", (req, res) => {
  res.status(404).send("page not found");
});
//#endregion

module.exports = app;
