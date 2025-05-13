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

//#region User Dashboard
router.get("/total-users", totalUsers);
router.get("/users-by-role", usersByRole);
router.get("/user-growth", userGrowth);
// #endregion

//#region Sales Dashboard
router.get("/total-sales", totalSales);
router.get("/total-revenue", totalRevenue);
router.get("/monthly-sales-trend", monthlySalesTrend);
router.get("/top-selling-content", topSellingContent);
// #endregion

//#region Movie & TV Show Dashboard
router.get("/most-visited-content", mostVisitedContent);
router.get("/top-rated-content", topRatedContent);
router.get("/content-by-genre", contentbyGenre);
// #endregion

//#region Cart & Watchlist Dashboard
router.get("/cart-frequency", cartFrequency);
router.get("/watchlist-trends", watchlistTrends);
router.get("/abandoned-carts", abandonedCarts);
//#endregion
module.exports = router;
