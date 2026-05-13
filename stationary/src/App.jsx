// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import WelcomePage from "./components/WelcomePage";
// import About from "./components/About";
// import Shop from "./components/shop";
// import Login from "./components/login";
// import Register from "./components/Register";
// import ProductDetails from "./components/ProductDetails";
// import cart from "./components/cart";
// import checkout from "./components/checkout";
// import OrderSuccess from "./components/OrderSuccess";
// import Orders from "./components/Orders";
// import Collections from "./components/collections";

// import adminDashboard from "./components/AdminDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route path='/' element={<WelcomePage />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/shop' element={<Shop />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/product/:id' element={<ProductDetails />} />
//         <Route path='/cart' element={<cart />} />
//         <Route
//           path='/checkout'
//           element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           }
//         />
//         <Route path='/success' element={<OrderSuccess />} />
//         <Route
//           path='/orders'
//           element={
//             <ProtectedRoute>
//               <Orders />
//             </ProtectedRoute>
//           }
//         />
//         <Route path='/collections' element={<Collections />} />

//         {/* Admin Route */}
//         <Route
//           path='/admin'
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import WelcomePage from "./components/WelcomePage";

import About from "./components/About";

import Shop from "./components/Shop";

import Login from "./components/Login";

import Register from "./components/Register";

import ProductDetails from "./components/ProductDetails";

import Cart from "./components/Cart";

import Checkout from "./components/Checkout";

import OrderSuccess from "./components/OrderSuccess";

import Orders from "./components/Orders";

import Collections from "./components/Collections";

import AdminDashboard from "./components/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminRoute from "./components/AdminRoute";

import AdminOrders from "./components/AdminOrders";

import Wishlist from "./components/Wishlist";

import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<WelcomePage />} />

        <Route path='/about' element={<About />} />

        <Route path='/shop' element={<Shop />} />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route path='/product/:id' element={<ProductDetails />} />

        <Route path='/cart' element={<Cart />} />

        <Route
          path='/checkout'
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin/orders'
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route path='/success' element={<OrderSuccess />} />

        <Route
          path='/orders'
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path='/collections' element={<Collections />} />

        {/* Admin Route */}

        <Route
          path='/admin'
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path='/wishlist' element={<Wishlist />} />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
