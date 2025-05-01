const express = require("express");
const cros = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cros({ origin: "*" }));
app.use(helmet());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  })
);

app.get("/", (req, res, next) => {
  res.send("Welcome to the Movies API!");
});


//#region endpoints
app.use("/api/movies", require("./src/routes/movies.router"));
app.use("/api/tvshows", require("./src/routes/tv.router"));
app.use("/api/genres", require("./src/routes/genres.router"));
//#endregion endpoints


// not found middleware
app.all("*any", (req, res) => {
  res.send("page not found");
});

module.exports = app;
