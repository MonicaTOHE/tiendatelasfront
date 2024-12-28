import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Cart from "./components/cart";
import Profile from "./pages/Profile";

function App() {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/cart" element={<Cart />} /> {/* Ruta del carrito */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
