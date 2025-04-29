const express = require("express");
const app = express();








// not found middleware
app.all("*any", (req, res) => {
  res.send("page not found");
});

module.exports = app;
