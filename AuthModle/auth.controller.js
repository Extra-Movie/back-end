const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });

const registerNewUser = async (req, res) => {
  let { name, email, password } = req.body;
  let userFound = await User.findOne({ email: email.toLowerCase() });
  if (userFound) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password,
  });
  console.log(newUser);
  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = user.generateAuthToken();
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
  });
};

module.exports = {
  registerNewUser,
  loginUser,
};
