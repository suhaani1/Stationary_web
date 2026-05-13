const mongoose = require("mongoose");

const orderSchema =
  mongoose.Schema(

    {
      orderItems: [

        {
          name: String,

          qty: Number,

          image: String,

          price: Number,

          product: {
            type:
              mongoose.Schema.Types.ObjectId,

            ref: "Product",
          },
        },
      ],

      shippingAddress: {

        fullName: String,

        phone: String,

        address: String,

        city: String,

        pincode: String,
      },

      totalPrice: {
        type: Number,
        required: true,
      },

      orderStatus: {
        type: String,
        default: "Pending",
      },

      isDelivered: {
        type: Boolean,
        default: false,
      },
    },

    {
      timestamps: true,
    }
);

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );