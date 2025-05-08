const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");

const authMiddleware = require("../middlewares/auth.middleware");
const { createPaymentIntent, addToCart } = require("../controllers/payment.controller");

router.post("/create-payment-intent",authMiddleware, createPaymentIntent);
module.exports = router;
