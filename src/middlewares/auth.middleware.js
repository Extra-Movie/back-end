const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config({ path: "../../.env" });

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Token:", token);
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  next();
};
