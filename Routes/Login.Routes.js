const express = require("express");
const router = express.Router();
const loginCont = require("../Controller/LoginController");


// #region register new user

router.post("/", loginCont.loginUser);

//#endregion



module.exports = router ;