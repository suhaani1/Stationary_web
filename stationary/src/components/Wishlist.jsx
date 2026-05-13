import React, {
  useContext,
} from "react";

import Navbar from "./Navbar";

import {
  WishlistContext,
} from "../context/WishlistContext";

import "./Wishlist.css";

function Wishlist() {

  const {

    wishlistItems,

    removeWishlist,

  } = useContext(
    WishlistContext
  );

  return (
    <>
      {/* <Navbar /> */}

      <div className="wishlist-page">

        <h1>
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (

          <div className="empty-wishlist">

            <h2>
              Wishlist Empty
            </h2>

          </div>

        ) : (

          <div className="wishlist-grid">

            {wishlistItems.map(
              (item) => (

                <div
                  className="wishlist-card"

                  key={item._id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() =>
                      removeWishlist(
                        item._id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </>
  );
}

export default Wishlist;