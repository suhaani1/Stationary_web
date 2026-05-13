import React from "react";

import { Link } from "react-router-dom";

import Navbar from "./Navbar";

import "./OrderSuccess.css";

function OrderSuccess() {

  return (
    <>
      {/* <Navbar /> */}

      <div className="success-page">

        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Placed Successfully
          </h1>

          <p>
            Thank you for shopping
            with Sri Radha Vallab Agency
            Stationery.
          </p>

          <p className="success-note">
            Your order is being
            processed and will
            be delivered soon.
          </p>

          <div className="success-buttons">

            <Link to="/shop">
              <button>
                Continue Shopping
              </button>
            </Link>

            <Link to="/orders">
              <button
                className="secondary-btn"
              >
                View Orders
              </button>
            </Link>

          </div>

        </div>

      </div>
    </>
  );
}

export default OrderSuccess;