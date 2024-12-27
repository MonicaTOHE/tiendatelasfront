import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name,
      lastName,
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://192.168.4.101:3000/api/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged && result.insertedId) {
          sessionStorage.setItem("userId", result.insertedId); // Guarda el ID obtenido del servidor
          navigate("/profile"); // Redirección a Profile
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mt-5">
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Apellidos</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            placeholder="Apellidos"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail2">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword3">Confirme contraseña</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword3"
            placeholder="Confirme contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Registrarme
        </button>
      </form>
    </div>
  );
}

export default SignUp;
