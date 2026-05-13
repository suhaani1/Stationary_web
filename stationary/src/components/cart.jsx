
import React, {
  useContext,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "./Navbar";

import {
  CartContext,
} from "../context/CartContext";

import "./Cart.css";

function Cart() {

  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  /* Coupon States */

  const [coupon, setCoupon] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  /* Subtotal */

  const subtotal =
    cartItems.reduce(
      (acc, item) =>
        acc + item.price * item.qty,
      0
    );

  /* Shipping */

  const shipping =
    subtotal > 1000 ? 0 : 80;

  /* GST */

  const gst =
    Math.round(subtotal * 0.18);

  /* Coupons */

  const coupons = {

    SAVE10: 10,

    WELCOME20: 20,

    FREESHIP: 80,
  };

  /* Apply Coupon */

  const applyCoupon = () => {

    if (coupon === "FREESHIP") {

      setDiscount(shipping);

      return;
    }

    if (coupons[coupon]) {

      const discountAmount =

        Math.round(
          subtotal *
          (coupons[coupon] / 100)
        );

      setDiscount(
        discountAmount
      );

    } else {

      alert(
        "Invalid Coupon"
      );
    }
  };

  /* Final Total */

  const total =
    subtotal +
    shipping +
    gst -
    discount;

  return (
    <>
     

      <div className="cart-page">

        <h1 className="cart-title">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (

          <div className="empty-cart">

            <h2>
              Your Cart Is Empty
            </h2>

            <p>
              Add products to continue shopping.
            </p>

            <button
              onClick={() =>
                navigate("/shop")
              }
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="cart-container">

            {/* Left */}

            <div className="cart-items">

              {cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item._id}
                >

                  {/* Image */}

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-image"
                  />

                  {/* Info */}

                  <div className="cart-info">

                    <h3>{item.name}</h3>

                    <p className="cart-brand">
                      {item.brand}
                    </p>

                    <p className="cart-price">
                      ₹{item.price}
                    </p>

                    {/* Quantity */}

                    <div className="qty-box">

                      <button
                        onClick={() =>
                          decreaseQty(
                            item._id
                          )
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(
                            item._id
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    {/* Remove */}

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(
                          item._id
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* Right */}

            <div className="summary-box">

              <h2>
                Price Details
              </h2>

              <div className="summary-row">
                <p>Subtotal</p>
                <span>
                  ₹{subtotal}
                </span>
              </div>

              <div className="summary-row">
                <p>Shipping</p>

                <span>
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping}`}
                </span>
              </div>

              <div className="summary-row">
                <p>GST (18%)</p>
                <span>
                  ₹{gst}
                </span>
              </div>

              {/* Coupon */}

              <div className="coupon-box">

                <input
                  type="text"

                  placeholder="Enter Coupon"

                  value={coupon}

                  onChange={(e) =>
                    setCoupon(
                      e.target.value
                    )
                  }
                />

                <button
                  onClick={applyCoupon}
                >
                  Apply
                </button>

              </div>

              {/* Available Coupons */}

              <div className="available-coupons">

                <h4>
                  Available Coupons
                </h4>

                <p>
                  SAVE10 → 10% OFF
                </p>

                <p>
                  WELCOME20 → 20% OFF
                </p>

                <p>
                  FREESHIP → Free Shipping
                </p>

              </div>

              {/* Discount */}

              <div className="summary-row">

                <p>
                  Discount
                </p>

                <span>
                  -₹{discount}
                </span>

              </div>

              <hr />

              <div className="summary-total">
                <h3>Total</h3>

                <h3>
                  ₹{total}
                </h3>
              </div>

              <button
                className="checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed To Checkout
              </button>

            </div>

          </div>
        )}

      </div>
    </>
  );
}

export default Cart;
