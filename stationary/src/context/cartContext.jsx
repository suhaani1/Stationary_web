import React, {
  createContext,
  useState,
  useEffect,
} from "react";

export const CartContext =
  createContext();

function CartProvider({ children }) {

  const [cartItems, setCartItems] =
    useState(() => {
      const savedCart =
        localStorage.getItem("cartItems");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  /* Add To Cart */
  const addToCart = (product) => {

    const exist =
      cartItems.find(
        (item) => item._id === product._id
      );

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  /* Remove */
  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter(
        (item) => item._id !== id
      )
    );
  };

  /* Increase Qty */
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };

  /* Decrease Qty */
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id && item.qty > 1
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;