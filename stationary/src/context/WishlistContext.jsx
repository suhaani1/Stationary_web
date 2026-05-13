import React, {
  createContext,
  useState,
  useEffect,
} from "react";

export const WishlistContext =
  createContext();

function WishlistProvider({
  children,
}) {

  const [wishlistItems,
    setWishlistItems] =
    useState(() => {

      const savedWishlist =
        localStorage.getItem(
          "wishlistItems"
        );

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    });

  useEffect(() => {

    localStorage.setItem(
      "wishlistItems",

      JSON.stringify(
        wishlistItems
      )
    );

  }, [wishlistItems]);

  /* Add Wishlist */

  const addToWishlist =
    (product) => {

      const exist =
        wishlistItems.find(
          (item) =>
            item._id ===
            product._id
        );

      if (!exist) {

        setWishlistItems([
          ...wishlistItems,
          product,
        ]);
      }
    };

  /* Remove */

  const removeWishlist =
    (id) => {

      setWishlistItems(

        wishlistItems.filter(
          (item) =>
            item._id !== id
        )
      );
    };

  return (

    <WishlistContext.Provider
      value={{

        wishlistItems,

        addToWishlist,

        removeWishlist,
      }}
    >

      {children}

    </WishlistContext.Provider>
  );
}

export default WishlistProvider;