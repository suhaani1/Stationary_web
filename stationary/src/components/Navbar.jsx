
// import { Link, useNavigate } from "react-router-dom";

// import { Menu, X, ShoppingCart, Heart, User, LogOut } from "lucide-react";

// import { useState, useContext } from "react";

// import "./Navbar.css";

// import logo from "../assets/logo.png";

// import { CartContext } from "../context/CartContext";

// function Navbar() {
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);

//   const { cartItems } = useContext(CartContext);

//   /* TOTAL CART */

//   const totalQty = cartItems.reduce(
//     (acc, item) => acc + item.qty,

//     0,
//   );

//   /* USER */

//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//   /* LOGOUT */

//   const logoutHandler = () => {
//     localStorage.removeItem("userInfo");

//     navigate("/login");

//     window.location.reload();
//   };

//   return (
//     <nav className='navbar'>
//       <div className='navbar-container'>
//         {/* LOGO */}

//         <Link to='/' className='navbar-logo' onClick={() => setMenuOpen(false)}>
//           <img src={logo} alt='Logo' className='logo-img' />

//           <span className='logo-text'>Sri Radha Vallab Agency</span>
//         </Link>

//         {/* DESKTOP MENU */}

//         <div className='navbar-links'>
//           <Link to='/'>Home</Link>

//           <Link to='/about'>About</Link>

//           <Link to='/collections'>Collections</Link>

//           <Link to='/shop'>Shop</Link>

//           {/* ADMIN */}

//           {userInfo?.isAdmin && <Link to='/admin'>Admin</Link>}

//           {/* WISHLIST */}

//           <Link to='/wishlist' className='wishlist-link'>
//             <Heart size={22} />
//           </Link>

//           {/* CART */}

//           <Link to='/cart' className='cart-link'>
//             <ShoppingCart size={22} />

//             <span className='cart-count'>{totalQty}</span>
//           </Link>

//           {/* USER */}

//           {userInfo ? (
//             <div className='user-section'>
//               <div className='user-profile'>
//                 <User size={18} />

//                 <span>{userInfo.name}</span>
//               </div>

//               <button onClick={logoutHandler} className='logout-btn'>
//                 <LogOut size={16} />
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className='auth-buttons'>
//               <Link to='/login'>
//                 <button className='login-btn'>Login</button>
//               </Link>

//               <Link to='/register'>
//                 <button className='register-btn'>Register</button>
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* MOBILE BUTTON */}

//         <button className='menu-btn' onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* MOBILE MENU */}

//       {menuOpen && (
//         <div className='mobile-menu'>
//           <Link to='/' onClick={() => setMenuOpen(false)}>
//             Home
//           </Link>

//           <Link to='/about' onClick={() => setMenuOpen(false)}>
//             About
//           </Link>

//           <Link to='/collections' onClick={() => setMenuOpen(false)}>
//             Collections
//           </Link>

//           <Link to='/shop' onClick={() => setMenuOpen(false)}>
//             Shop
//           </Link>

//           {userInfo && (
//   <Link to='/profile'>
//     Profile
//   </Link>
// )}
//           {/* ADMIN */}

//           {userInfo?.isAdmin && (
//             <>
//               <Link to='/admin'>Admin</Link>

//               <Link to='/admin/orders'>Orders</Link>
//             </>
//           )}

//           <Link to='/wishlist' onClick={() => setMenuOpen(false)}>
//             Wishlist
//           </Link>

//           <Link to='/cart' onClick={() => setMenuOpen(false)}>
//             Cart ({totalQty})
//           </Link>

//           {userInfo ? (
//             <div className='mobile-user'>
//               <span>
//                 Hello,
//                 {userInfo.name}
//               </span>

//               <button
//                 className='logout-btn'
//                 onClick={() => {
//                   logoutHandler();

//                   setMenuOpen(false);
//                 }}
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <>
//               <Link to='/login' onClick={() => setMenuOpen(false)}>
//                 Login
//               </Link>

//               <Link to='/register' onClick={() => setMenuOpen(false)}>
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


// Navbar.jsx

// Navbar.jsx

import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Search,
  Moon,
  Sun,
} from "lucide-react";

import {
  useState,
  useContext,
} from "react";

import { ThemeContext } from "../context/ThemeContext";

import "./Navbar.css";

import logo from "../assets/logo.png";

import {
  CartContext,
} from "../context/CartContext";

function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const { cartItems } =
    useContext(CartContext);

    const {
  darkMode,
  toggleTheme,
} = useContext(
  ThemeContext
);

  /* TOTAL CART */

  const totalQty =
    cartItems.reduce(
      (acc, item) =>
        acc + item.qty,
      0
    );

  /* USER */

  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  /* SEARCH */

  const searchHandler = (e) => {

    e.preventDefault();

    if (search.trim()) {

      navigate(
        `/shop?search=${search}`
      );

      setMenuOpen(false);

    } else {

      navigate("/shop");
    }
  };

  /* LOGOUT */

  const logoutHandler = () => {

    localStorage.removeItem(
      "userInfo"
    );

    navigate("/");
  };

  return (

    <nav className='navbar'>

      <div className='navbar-container'>

        {/* LOGO */}

        <Link
          to='/'
          className='navbar-logo'
          onClick={() =>
            setMenuOpen(false)
          }
        >

          <img
            src={logo}
            alt='Logo'
            className='logo-img'
          />

          <span className='logo-text'>
            Sri Radha Vallab Agency
          </span>

        </Link>

        {/* SEARCH */}

        <form
          className='navbar-search'
          onSubmit={searchHandler}
        >

          <input
            type='text'
            placeholder='Search stationery...'
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <button type='submit'>

            <Search size={18} />

          </button>

        </form>

        {/* DESKTOP MENU */}

        <div className='navbar-links'>

          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : ""
            }
          >
            About
          </NavLink>

          <NavLink
            to='/collections'
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : ""
            }
          >
            Collections
          </NavLink>

          <NavLink
            to='/shop'
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : ""
            }
          >
            Shop
          </NavLink>

          {/* ADMIN */}

          {userInfo?.isAdmin && (

            <NavLink
              to='/admin'
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : ""
              }
            >
              Admin
            </NavLink>
          )}

          {/* WISHLIST */}

          <Link
            to='/wishlist'
            className='wishlist-link'
          >

            <Heart size={22} />

          </Link>

          {/* CART */}

          <Link
            to='/cart'
            className='cart-link'
          >

            <ShoppingCart size={22} />

            <span className='cart-count'>
              {totalQty}
            </span>

          </Link>

          {/* USER */}

          {userInfo ? (

            <div className='user-section'>

              <Link
                to='/profile'
                className='user-profile'
              >

                <User size={18} />

                <span>
                  {userInfo.name}
                </span>

              </Link>

              <button
                onClick={logoutHandler}
                className='logout-btn'
              >

                <LogOut size={16} />

                Logout

              </button>

              <button
  className="theme-btn"

  onClick={toggleTheme}
>

  {darkMode ? (
    <Sun size={20} />
  ) : (
    <Moon size={20} />
  )}

</button>

            </div>

          ) : (

            <div className='auth-buttons'>

              <Link to='/login'>

                <button className='login-btn'>
                  Login
                </button>

              </Link>

              <Link to='/register'>

                <button className='register-btn'>
                  Register
                </button>

              </Link>

            </div>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          className='menu-btn'
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >

          {menuOpen ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}

        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className='mobile-menu'>

          {/* MOBILE SEARCH */}

          <form
            className='mobile-search'
            onSubmit={searchHandler}
          >

            <input
              type='text'
              placeholder='Search products...'
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <button type='submit'>

              <Search size={18} />

            </button>

          </form>

          <Link
            to='/'
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Home
          </Link>

          <Link
            to='/about'
            onClick={() =>
              setMenuOpen(false)
            }
          >
            About
          </Link>

          <Link
            to='/collections'
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Collections
          </Link>

          <Link
            to='/shop'
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Shop
          </Link>

          {/* ADMIN */}

          {userInfo?.isAdmin && (
            <>
              <Link
                to='/admin'
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Admin
              </Link>

              <Link
                to='/admin/orders'
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Orders
              </Link>
            </>
          )}

          {/* WISHLIST */}

          <Link
            to='/wishlist'
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Wishlist
          </Link>

          {/* CART */}

          <Link
            to='/cart'
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Cart ({totalQty})
          </Link>

          {/* USER */}

          {userInfo ? (

            <div className='mobile-user'>

              <Link
                to='/profile'
                className='mobile-profile-btn'
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <User size={18} />

                <span>
                  {userInfo.name}
                </span>

              </Link>

              <button
                className='logout-btn'

                onClick={() => {

                  logoutHandler();

                  setMenuOpen(false);
                }}
              >

                <LogOut size={16} />

                Logout

              </button>

            </div>

          ) : (
            <>
              <Link
                to='/login'
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Login
              </Link>

              <Link
                to='/register'
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Register
              </Link>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;