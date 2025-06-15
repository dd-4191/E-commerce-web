import React from "react";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Cart from "./components/cart/Cart";
import ProductsPage from "./pages/products/ProductsPage";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Footer from "./components/footer/Footer";
import Register from "./pages/register/Register";
import ProductDetails from "./pages/singleProduct/ProductDetails";

import { ToastContainer } from "react-toastify";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Profile from "./pages/Profile/Profile";
import ErrorPage from "./pages/error/ErrorPage";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            // <ProtectedRoute>
            <Cart />
            // </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
