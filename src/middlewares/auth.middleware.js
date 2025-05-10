const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config({ path: "../../.env" });

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return res.status(401).json({ message: "Invalid token." });
  req.userId = decoded.id;
  // console.log("decoded id",decoded.id);
  req.isAdmin = decoded.isAdmin;
  next();
};
