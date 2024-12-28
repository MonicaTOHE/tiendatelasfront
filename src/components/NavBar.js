import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "./CartContext"; // Importar el contexto del carrito

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart } = useCart(); // Usar el carrito desde el contexto

  // Calcular la cantidad total de productos en el carrito
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-4">
      <div className="d-flex justify-content-between w-100 align-items-center">
        {/* Grupo izquierdo: Home y Listado de Productos */}
        <div className="d-flex align-items-center">
          <NavLink className="me-4 py-2 nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="me-4 py-2 nav-link" to="/products">
            Listado de Productos
          </NavLink>
        </div>

        {/* Grupo derecho: Sign Up, Log In y carrito */}
        <div className="d-flex align-items-center">
          {!isLoggedIn ? (
            <>
              <NavLink className="me-4 py-2 nav-link" to="/signup">
                Sign Up
              </NavLink>
              <NavLink className="me-4 py-2 nav-link" to="/login">
                Log In
              </NavLink>
            </>
          ) : (
            <NavLink
              className="me-4 py-2 nav-link"
              to="/"
              onClick={() => setIsLoggedIn(false)}
            >
              Log Out
            </NavLink>
          )}
          <NavLink
            className="me-4 py-2 nav-link d-flex align-items-center"
            to="/cart"
          >
            🛒 Carrito{" "}
            {totalItems > 0 && (
              <span className="ms-2 badge bg-secondary">{totalItems}</span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
