const express = require("express");

const router = express.Router();

const {
  createCoupon,
  applyCoupon,
  getCoupons,
} = require(
  "../controllers/couponController"
);

router.post(
  "/",
  createCoupon
);

router.post(
  "/apply",
  applyCoupon
);

router.get(
  "/",
  getCoupons
);

module.exports = router;