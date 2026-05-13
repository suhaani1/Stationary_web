const express = require("express");

const router = express.Router();

const {

  createOrder,

  getOrders,

  updateOrderStatus,

} = require(
  "../controllers/orderController"
);

/* Create Order */

router.post(
  "/",
  createOrder
);

/* Get All Orders */

router.get(
  "/",
  getOrders
);

/* Update Status */

router.put(
  "/:id/status",
  updateOrderStatus
);

module.exports = router;