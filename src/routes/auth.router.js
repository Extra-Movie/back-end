const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  loginUser,
} = require("../controllers/auth.controller");
const validateUser = require("../middlewares/vlidateUser.middleware");
router.post("/register", validateUser, registerNewUser);
router.post("/login", loginUser);

module.exports = router;
