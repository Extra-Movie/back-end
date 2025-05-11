const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { createPaymentIntent } = require("../controllers/payment.controller");

router.post("/create-payment-intent", authMiddleware, createPaymentIntent);
module.exports = router;
