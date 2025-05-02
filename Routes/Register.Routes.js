// #region Requires
const express = require("express");
const router = express.Router();
const registerCont = require("../Controller/RegisterController.js");

//#endregion

// #region register new user

router.post("/", registerCont.registerNewUser);

//#endregion

module.exports = router;
