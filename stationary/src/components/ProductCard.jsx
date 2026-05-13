import React, { useContext } from "react";

import {
  Heart,
} from "lucide-react";

import {
  WishlistContext,
} from "../context/WishlistContext";

import { Link } from "react-router-dom";

/* Import Cart Context */
import {
  CartContext,
} from "../context/CartContext";

import "./ProductCard.css";

function ProductCard({ product }) {

  /* Access addToCart */
  const { addToCart } =
    useContext(CartContext);

  /* Access wishlist functions */
  const { addToWishlist, removeWishlist } =
    useContext(WishlistContext);

  return (
    <div className="product-card">

      {/* Product Link */}
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

      {/* Add To Cart Button */}
      <button
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>

      {/* Add To Wishlist Button */}
      <button
        onClick={() => addToWishlist(product)}
      >
        <Heart />
      </button>

    </div>
  );
}

export default ProductCard;