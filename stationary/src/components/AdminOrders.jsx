import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "./Navbar";

import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] =
    useState([]);

  const statuses = [
    "Pending",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const fetchOrders = () => {
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
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="admin-orders-page">
        <h1>Manage Orders</h1>

        <div className="orders-list">
          {orders.map((order) => (
            <div
              className="admin-order-card"
              key={order._id}
            >
              <div className="admin-order-top">
                <div>
                  <h3>Order ID</h3>
                  <p>{order._id}</p>
                </div>

                <div>
                  <h3>Customer</h3>
                  <p>
                    {
                      order
                        .shippingAddress
                        ?.fullName
                    }
                  </p>
                </div>

                <div>
                  <h3>Total</h3>
                  <p>
                    ₹{order.totalPrice}
                  </p>
                </div>
              </div>

 <div className="admin-order-products">
                {order.orderItems.map(
                  (item, index) => (
                    <div
                      className="admin-order-product"
                      key={index}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>
                        <h4>{item.name}</h4>
                        <p>
                          Qty: {item.qty}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="status-box">
                <h3>Status</h3>
 <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  {statuses.map(
                    (status) => (
                      <option key={status}>
                        {status}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminOrders;