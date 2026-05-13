import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "./Navbar";

import "./Profile.css";

function Profile() {

  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [orders, setOrders] =
    useState([]);

  /* Load User */

  useEffect(() => {

    if (userInfo) {

      setName(userInfo.name);

      setEmail(userInfo.email);
    }

    /* Fetch Orders */

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

  /* Update Profile */

  const updateProfile =
    async (e) => {

      e.preventDefault();

      try {

        const { data } =
          await axios.put(
            `http://localhost:5000/api/users/${userInfo._id}`,
            {
              name,
              email,
              password,
            }
          );

        localStorage.setItem(
          "userInfo",

          JSON.stringify({
            ...userInfo,
            name,
            email,
          })
        );

        alert(
          "Profile Updated"
        );

        console.log(data);

      } catch (error) {

        console.log(error);
      }
};

  return (
    <>
      {/* <Navbar /> */}

      <div className="profile-page">

        <div className="profile-container">

          {/* Left */}
          <div className="profile-box">

            <h2>
              My Profile
            </h2>

            <form
              onSubmit={
                updateProfile
              }
            >

              <input
                type="text"

                value={name}

                placeholder="Name"

                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

              <input
                type="email"

                value={email}

                placeholder="Email"

                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

              <input
                type="password"

                value={password}

                placeholder="New Password"

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button type="submit">
                Update Profile
              </button>

            </form>

          </div>

          {/* Right */}

          <div className="profile-orders">

            <h2>
              My Orders
            </h2>

            {orders.length === 0 ? (

              <p>
                No Orders Found
              </p>

            ) : (

              orders.map((order) => (

                <div
                  className="profile-order"

                  key={order._id}
                >

                  <div>

                    <h4>
                      Order ID
                    </h4>

                    <p>
                      {order._id}
                    </p>

                  </div>

                  <div>

                    <h4>
                      Total
                    </h4>

                    <p>
                      ₹
                      {order.totalPrice}
                    </p>

                  </div>

                  <div>

                    <h4>
                      Status
                    </h4>

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
              ))
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;