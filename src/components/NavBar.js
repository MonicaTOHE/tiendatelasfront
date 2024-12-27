import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="navbar">
      {/* Enlaces del lado izquierdo */}
      <div className="navbar-nav navbar-nav-left">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/products">
          Listado de Productos
        </NavLink>
      </div>

      {/* Enlaces del lado derecho */}
      <div className="navbar-nav navbar-nav-right">
        {!isLoggedIn ? (
          <>
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Log In
            </NavLink>
          </>
        ) : (
          <NavLink
            className="nav-link"
            to="/"
            onClick={() => setIsLoggedIn(false)}
          >
            Log Out
          </NavLink>
        )}
        <div className="cart-icon">🛒 Carrito (0)</div>
      </div>
    </nav>
  );
}

export default NavBar;
