const express = require("express");
const cros = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const app = express();

app.use(morgan("dev"));
// adding webhook for stripe here to prevent body parsing using express.json()
app.use("/webhook/payment", require("./src/webhooks/payment.webhook"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
// // Set public-access headers
// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Let any site embed your resource
//   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); // Optional - needed for SharedArrayBuffer
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');    // Optional - for cross-origin isolation
//   next();
// });
app.use(helmet());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  })
);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(require("./src/config/swagger"))
);

app.get("/", (req, res, next) => {
  res.send("Welcome to the Movies API!");
});

//#region endpoints
app.use("/api/auth", require("./src/routes/auth.router"));
app.use("/api/users", require("./src/routes/user.router"));
app.use("/api/movies", require("./src/routes/movies.router"));
app.use("/api/tvshows", require("./src/routes/tv.router"));
app.use("/api/genres", require("./src/routes/genres.router"));
app.use("/api/payment", require("./src/routes/payment.router"));
app.use("/api/dashboard", require("./src/routes/dashboard.router"));
//#endregion endpoints

// not found middleware
app.all("*any", (req, res) => {
  res.send("page not found");
});

module.exports = app;
