const express = require("express");
const router = express.Router();
const adminCon = require("../Controller/adminController");
const adminMiddleware = require('../MiddleWares/Admin.Middleware');


// #region register new user

router.get("/allusers",adminMiddleware.checkIfItIsAdmin ,adminCon.getAllUsersData);
router.delete("/deleteuser",adminMiddleware.checkIfItIsAdmin ,adminCon.deleteNormalUser);

//#endregion



module.exports = router ;