import React from "react";
import { Link } from "react-router-dom";

import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <Link
        to={`/product/${product._id}`}
        className="product-link"
      >

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <div className="product-info">

          <h3>{product.name}</h3>

          <p className="brand">
            {product.brand}
          </p>

          <p className="price">
            ₹{product.price}
          </p>

        </div>

      </Link>

      <button>
        Add To Cart
      </button>

    </div>
  );
}

export default ProductCard;