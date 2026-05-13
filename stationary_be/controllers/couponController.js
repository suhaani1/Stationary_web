const Coupon = require("../models/Coupons");

/* CREATE COUPON */
exports.createCoupon = async (
  req,
  res
) => {
  try {
    const {
      code,
      discountPercent,
      expiryDate,
    } = req.body;

    const coupon = new Coupon({
      code,
      discountPercent,
      expiryDate,
    });

    const createdCoupon =
      await coupon.save();

    res.status(201).json(
      createdCoupon
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/* APPLY COUPON */
exports.applyCoupon = async (
  req,
  res
) => {
  try {
    const coupon = await Coupon.findOne({
      code: req.body.code.toUpperCase(),
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Invalid Coupon",
      });
    }

    if (!coupon.isActive) {
      return res.status(400).json({
        message: "Coupon Disabled",
      });
    }

    if (
      new Date(coupon.expiryDate) <
      new Date()
    ) {
      return res.status(400).json({
        message: "Coupon Expired",
      });
    }

    res.json({
      code: coupon.code,
      discountPercent:
        coupon.discountPercent,
    });
  } catch (error) {
    res.status(500).json({
        message: error.message,
    });
  }
};

/* GET COUPONS */
exports.getCoupons = async (
  req,
  res
) => {
  try {
    const coupons = await Coupon.find();

    res.json(coupons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};