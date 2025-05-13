const express = require("express");
const router = express.Router();
const {
  usersByRole,
  userGrowth,
  totalUsers,
  totalSales,
  totalRevenue,
  monthlySalesTrend,
  topSellingContent,
  mostVisitedContent,
  topRatedContent,
  contentbyGenre,
  cartFrequency,
  watchlistTrends,
  abandonedCarts,
} = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

//#region User Dashboard
router.get("/total-users", authMiddleware, adminMiddleware, totalUsers);
router.get("/users-by-role", authMiddleware, adminMiddleware, usersByRole);
router.get("/user-growth", authMiddleware, adminMiddleware, userGrowth);
// #endregion

//#region Sales Dashboard
router.get("/total-sales", authMiddleware, adminMiddleware, totalSales);
router.get("/total-revenue", authMiddleware, adminMiddleware, totalRevenue);
router.get(
  "/monthly-sales-trend",
  authMiddleware,
  adminMiddleware,
  monthlySalesTrend
);
router.get(
  "/top-selling-content",
  authMiddleware,
  adminMiddleware,
  topSellingContent
);
// #endregion

//#region Movie & TV Show Dashboard
router.get(
  "/most-visited-content",
  authMiddleware,
  adminMiddleware,
  mostVisitedContent
);
router.get(
  "/top-rated-content",
  authMiddleware,
  adminMiddleware,
  topRatedContent
);
router.get(
  "/content-by-genre",
  authMiddleware,
  adminMiddleware,
  contentbyGenre
);
// #endregion

//#region Cart & Watchlist Dashboard
router.get("/cart-frequency", authMiddleware, adminMiddleware, cartFrequency);
router.get(
  "/watchlist-trends",
  authMiddleware,
  adminMiddleware,
  watchlistTrends
);
//#endregion

module.exports = router;
