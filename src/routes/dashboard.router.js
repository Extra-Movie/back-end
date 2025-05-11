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
module.exports = router;
