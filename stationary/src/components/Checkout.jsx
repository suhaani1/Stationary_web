// Checkout.jsx

import React, {
  useContext,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "./Navbar";

import {
  CartContext,
} from "../context/CartContext";

import "./Checkout.css";

function Checkout() {

  const navigate =
    useNavigate();

  const { cartItems } =
    useContext(CartContext);

  const [shipping, setShipping] =
    useState({
      name: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    });

  /* Handle Input */

  const handleChange = (e) => {

    setShipping({
      ...shipping,

      [e.target.name]:
        e.target.value,
    });
  };

  /* Total Price */

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price * item.qty,
      0
    );

  /* Place Order */

  const handleOrder =
    async () => {

      try {

        const orderData = {

          orderItems:
            cartItems.map(
              (item) => ({

                name:
                  item.name,

                qty:
                  item.qty,

                image:
                  item.image,

                price:
                  item.price,

                product:
                  item._id,
              })
            ),

          shippingAddress: {

            fullName:
              shipping.name,

            phone:
              shipping.phone,

            address:
              shipping.address,

            city:
              shipping.city,

            pincode:
              shipping.pincode,
          },

          totalPrice,
        };

        /* API CALL */

        await axios.post(
          "http://localhost:5000/api/orders",
          orderData
        );

        /* SUCCESS */

        alert(
          "Order Placed Successfully"
        );

        /* Go To Success Page */

        navigate("/success");

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );
      }
    };

  return (
    <>
      {/* <Navbar /> */}

      <div className="checkout-page">

        <div className="checkout-container">

          {/* Shipping */}

          <div className="shipping-box">

            <h2>
              Shipping Address
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Full Address"
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
            />

          </div>

          {/* Summary */}

          <div className="summary-box">

            <h2>
              Order Summary
            </h2>

            {cartItems.map(
              (item) => (

                <div
                  className="summary-item"
                  key={item._id}
                >

                  <p>
                    {item.name}
                    × {item.qty}
                  </p>

                  <span>
                    ₹
                    {item.price *
                      item.qty}
                  </span>

                </div>
              )
            )}

            <hr />

            <h3>
              Total:
              ₹{totalPrice}
            </h3>

            <button
              onClick={
                handleOrder
              }
            >
              Place Order
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Checkout;