import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

/* Import Cart Provider */
import CartProvider from "./context/CartContext";

import WishlistProvider from "./context/WishlistContext";

import ThemeProvider from "./context/ThemeContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    {/* Wrap Whole App */}
    <CartProvider>
      <WishlistProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </WishlistProvider>
    </CartProvider>

  </React.StrictMode>
);