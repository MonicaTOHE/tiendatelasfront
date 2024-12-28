import React, { useEffect, useState } from "react";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetch(
        `https://tiendatelasbackend-production.up.railway.app/api/users/${userId}`,
        {
          method: "GET",
          redirect: "follow",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserData({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
          });
        })
        .catch((error) => console.error("Error:", error));
    }
  }, []);

  return (
    <div className="container mt-5 shadow bg-white rounded baja ">
      <form>
        {/* Formularioo con los datos del usuario usando userData */}
        {/* Input para email */}
        <div className="row mb-3">
          <label
            htmlFor="emailProfile"
            className="col-sm-2 col-form-label font-weight-bold"
          >
            Email:
          </label>
          <div className="col-sm-10">
            <input
              value={userData.email}
              type="email"
              className="form-control-plaintext product-info"
              id="emailProfile"
              readOnly
            />
          </div>
        </div>
        {/* Input para nombre */}
        <div className="row mb-3">
          <label
            htmlFor="nombreProfile"
            className="col-sm-2 col-form-label font-weight-bold"
          >
            Nombre:
          </label>
          <div className="col-sm-10">
            <input
              value={userData.name}
              type="text"
              className="form-control-plaintext product-info"
              id="nombreProfile"
              readOnly
            />
          </div>
        </div>
        {/* Input para apellido */}
        <div className="row mb-3">
          <label
            htmlFor="apellidoProfile"
            className="col-sm-2 col-form-label font-weight-bold"
          >
            Apellido:
          </label>
          <div className="col-sm-10">
            <input
              value={userData.lastName}
              type="text"
              className="form-control-plaintext product-info"
              id="apellidoProfile"
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
