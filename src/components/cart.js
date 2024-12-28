import React from "react";
import { useCart } from "./CartContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import MercadoPagoButton from "./MercadoPagoButton";
initMercadoPago("APP_USR-0b32ed69-db60-48b8-bc6c-4efbca600684");

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const mapped = cart.map((product) => {
    return {
      title: product.name,
      description: product.description,
      quantity: product.quantity,
      currency_id: "CLP",
      unit_price: product.price,
    };
  });

  const preferenceId = async (event) => {
    const res = await fetch(
      "https://tiendatelasbackend-production.up.railway.app/api/checkout",
      {
        method: "POST",
        body: JSON.stringify(mapped),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  };
  const formatPrice = (price) =>
    price.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  return (
    <div className="container mt-5 baja">
      <h1 className="mb-4">Mi Carrito</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th>Unitario</th>
                <th>Cantidad</th>
                <th>Sub-total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                    {item.name}
                  </td>
                  <td>{formatPrice(item.price)}</td>
                  <td className="d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-outline-secondary me-2"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span
                      className="quantity-display mx-2"
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        padding: "0 10px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-outline-secondary ms-2"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>{formatPrice(item.price * item.quantity)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h3>
              Total:{" "}
              {formatPrice(
                cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )
              )}
            </h3>
            <MercadoPagoButton></MercadoPagoButton>
            <div id="preferenceId">
              <Wallet
                initialization={{ preferenceId }}
                customization={{ texts: { valueProp: "smart_option" } }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
