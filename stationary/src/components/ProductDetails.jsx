import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import Navbar from "./Navbar";

import {
  CartContext,
} from "../context/CartContext";

import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { addToCart } =
    useContext(CartContext);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  /* Fetch Product */

  useEffect(() => {

    axios
      .get(
        `http://localhost:5000/api/products/${id}`
      )

      .then((res) => {
        setProduct(res.data);
      })

      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  /* Submit Review */

  const submitReview =
    async (e) => {

      e.preventDefault();

      if (!comment) {
        return alert(
          "Please write comment"
        );
      }

      try {

        setLoading(true);

        await axios.post(

          `http://localhost:5000/api/products/${id}/reviews`,

          {
            user: userInfo.name,

            name: userInfo.name,

            rating,

            comment,
          }
        );

        alert(
          "Review Added Successfully"
        );

        setComment("");

        setRating(5);

        /* Refresh Product */

        const { data } =
          await axios.get(
            `http://localhost:5000/api/products/${id}`
          );

        setProduct(data);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

        alert(
          error.response?.data?.message ||
          "Something went wrong"
        );
      }
    };

  /* Loading */

  if (!product) {

    return (
      <>
        <Navbar />

        <h1 className="loading-text">
          Loading...
        </h1>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="details-page">

        <div className="details-container">

          {/* Product Image */}

          <div className="details-image">

            <img
              src={product.image}
              alt={product.name}
            />

          </div>

          {/* Product Info */}

          <div className="details-info">

            <h1>
              {product.name}
            </h1>

            <h3>
              {product.brand}
            </h3>

            <p className="details-price">
              ₹{product.price}
            </p>

            <p className="details-desc">
              {product.description}
            </p>

            {/* Stock */}

            <p className="stock-text">

              Status:

              {product.countInStock > 0 ? (

                <span className="in-stock">
                  In Stock
                </span>

              ) : (

                <span className="out-stock">
                  Out Of Stock
                </span>
              )}
            </p>

            {/* Rating */}

            <div className="rating-box">

              <h3>
                ⭐{" "}
                {product.rating
                  ? product.rating.toFixed(1)
                  : 0}
              </h3>

              <p>
                {product.numReviews} Reviews
              </p>

            </div>

            {/* Add Cart */}

            <button
              className="cart-btn"

              onClick={() =>
                addToCart(product)
              }
            >
              Add To Cart
            </button>

            {/* Review Form */}

            {userInfo ? (

              <form
                className="review-form"
                onSubmit={submitReview}
              >

                <h3>
                  Write Review
                </h3>

                <select
                  value={rating}

                  onChange={(e) =>
                    setRating(
                      e.target.value
                    )
                  }
                >

                  <option value="1">
                    1 Star
                  </option>

                  <option value="2">
                    2 Star
                  </option>

                  <option value="3">
                    3 Star
                  </option>

                  <option value="4">
                    4 Star
                  </option>

                  <option value="5">
                    5 Star
                  </option>

                </select>

                <textarea

                  placeholder="Write your review..."

                  value={comment}

                  onChange={(e) =>
                    setComment(
                      e.target.value
                    )
                  }
                />

                <button
                  type="submit"
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Review"}
                </button>

              </form>

            ) : (

              <p className="login-review">
                Login to write review
              </p>
            )}

          </div>

        </div>

        {/* Reviews Section */}

        <div className="reviews-section">

          <h2>
            Customer Reviews
          </h2>

          {product.reviews &&
          product.reviews.length === 0 ? (

            <p className="no-review">
              No Reviews Yet
            </p>

          ) : (

            product.reviews.map(
              (review, index) => (

                <div
                  className="review-card"
                  key={index}
                >

                  <div className="review-top">

                    <h4>
                      {review.name}
                    </h4>

                    <span>
                      ⭐ {review.rating}
                    </span>

                  </div>

                  <p>
                    {review.comment}
                  </p>

                </div>
              )
            )
          )}

        </div>

      </div>
    </>
  );
}

export default ProductDetails;