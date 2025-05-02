const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config({ path: "../../.env" });

module.exports = async (req, res, next) => {
  const id = req.userId;
  if (!id) return res.status(401).json({ message: "Access denied." });
  const user = await User.findById(id);
  if (!user) return res.status(401).json({ message: "Access denied." });
  const admin = user.isAdmin;
  if (!admin) {
    return res.status(403).json({ message: "Access denied. Not an admin." });
  }
  next();
};
