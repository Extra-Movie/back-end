const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  loginUser,
} = require("../controllers/auth.controller");
const validateUser = require("../middlewares/vlidateUser.middleware");
const validateLogin = require("../middlewares/validateLogin.middleware");
router.post("/register", validateUser, registerNewUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
