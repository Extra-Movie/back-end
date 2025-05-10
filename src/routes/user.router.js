const express = require("express");
const router = express.Router();
const {
  getAllUsersData,
  getUserDataById,
  updateProfile,
  deleteUser,
  makeAdmin,
  addToWatchlist,
  getWatchlist,
  getCardsItems,
  addToCart,
  getOwned,
  addToOwned,
  removeFromCart,
  removeFromWatchlist
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.post("/addOwned", authMiddleware, addToOwned);
router.get("/getOwned", authMiddleware, getOwned);



router.get("/getCart", authMiddleware, getCardsItems);
router.post("/addToCart", authMiddleware, addToCart);
router.delete("/removeCart", authMiddleware, removeFromCart);



router.post("/watchlist", authMiddleware, addToWatchlist);
router.get("/getWatchlist", authMiddleware, getWatchlist);
router.delete("/removeWatchlist", authMiddleware, removeFromWatchlist);

router.get("/", authMiddleware, adminMiddleware, getAllUsersData);
router.get("/:id", authMiddleware, getUserDataById);
router.put("/:id", authMiddleware, updateProfile);
router.delete("/:id", authMiddleware, deleteUser);
router.patch("/:id", authMiddleware, adminMiddleware, makeAdmin);



module.exports = router;
