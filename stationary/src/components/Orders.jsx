import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "./Navbar";

import "./Orders.css";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    axios
      .get(
        "http://localhost:5000/api/orders"
      )

      .then((res) => {
        setOrders(res.data);
      })

      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <>
      {/* <Navbar /> */}

      <div className="orders-page">

        <h1>
          My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="no-orders">

            <h2>
              No Orders Found
            </h2>

          </div>

        ) : (

          orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              {/* Header */}
              <div className="order-header">

                <div>
                  <h3>
                    Order ID
                  </h3>

                  <p>
                    {order._id}
                  </p>
                </div>

                <div>
                  <h3>
                    Date
                  </h3>

                  <p>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h3>
                    Total
                  </h3>

                  <p>
                    ₹
                    {order.totalPrice}
                  </p>
                </div>

                <div>
                  <h3>
                    Status
                  </h3>

                  <span
                    className={
                      order.isDelivered
                        ? "delivered"
                        : "pending"
                    }
                  >
                    {order.isDelivered
                      ? "Delivered"
                      : "Pending"}
                  </span>
                </div>

              </div>

              {/* Products */}
              <div className="order-products">

                {order.orderItems.map(
                  (item, index) => (

                    <div
                      className="order-product"
                      key={index}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>

                        <h4>
                          {item.name}
                        </h4>

                        <p>
                          Qty:
                          {item.qty}
                        </p>

                        <p>
                          ₹
                          {item.price}
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>
          ))
        )}

      </div>
    </>
  );
}

export default Orders;