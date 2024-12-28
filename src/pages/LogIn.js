import React from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        "https://tiendatelasbackend-production.up.railway.app/api/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: event.target.email.value,
            password: event.target.password.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        sessionStorage.setItem("userId", data._id);
        navigate("/profile");
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="container mt-5 baja">
      <h1>Ingresa a tu cuenta</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            placeholder="ingresar email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            Nunca se compartirá esta información con nadie.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder="contraseña"
            required
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default LogIn;
