const express = require("express");
const { paymentListener } = require("../controllers/payment.controller");
const bodyParser = require("body-parser");
const router = express.Router();

router.post(
  "/intentPayment",
  bodyParser.raw({
    type: "application/json",
  }),
  paymentListener
);

module.exports = router;
