const express = require("express");
const router = express.Router();
const {
  getAllUsersData,
  getUserDataById,
  updateProfile,
  deleteUser,
  makeAdmin,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/", authMiddleware, adminMiddleware, getAllUsersData);
router.get("/:id", authMiddleware, getUserDataById);
router.put("/:id", authMiddleware, updateProfile);
router.delete("/:id", authMiddleware, deleteUser);
router.patch("/:id", authMiddleware, adminMiddleware, makeAdmin);

module.exports = router;
