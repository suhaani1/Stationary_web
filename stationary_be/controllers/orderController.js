const Order = require("../models/Order");

/* =========================
   CREATE ORDER
========================= */

exports.createOrder = async (
  req,
  res
) => {
  try {

    const {
      orderItems,
      shippingAddress,
      totalPrice,
    } = req.body;

    /* Check Empty */

    if (
      !orderItems ||
      orderItems.length === 0
    ) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    /* Create Order */

    const order = new Order({

      orderItems,

      shippingAddress,

      totalPrice,

      orderStatus: "Pending",
    });

    /* Save */

    const createdOrder =
      await order.save();

    res.status(201).json(
      createdOrder
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   GET ALL ORDERS
========================= */

exports.getOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Order.find()

        .sort({
          createdAt: -1,
        });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   UPDATE ORDER STATUS
========================= */

exports.updateOrderStatus =
  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.id
        );

      /* Check Order */

      if (!order) {

        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      /* Update Status */

      order.orderStatus =
        req.body.status;

      /* Delivered */

      if (
        req.body.status ===
        "Delivered"
      ) {

        order.isDelivered = true;

      } else {

        order.isDelivered = false;
      }

      /* Save */

      const updatedOrder =
        await order.save();

      res.json(updatedOrder);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
};