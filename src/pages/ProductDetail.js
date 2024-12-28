import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://tiendatelasbackend-production.up.railway.app/api/products/${id}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta de la red");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="estiloParaCargar">Cargando...</div>;
  if (error) return <div className="estiloParaErrores">Error: {error}</div>;

  return (
    <div className="estiloParaContenedor">
      <div className="estiloParaTarjetas">
        <div className="estiloParaFilas">
          <div className="estiloParaImagen">
            <img
              src={product.images[0]}
              alt={product.name}
              className="estiloParaImagenProducto"
            />
          </div>
          <div className="estiloParaContenido">
            <h1 className="estiloParaTitulo">{product.name}</h1>
            <p className="estiloParaTexto">{product.description}</p>
            <p className="estiloParaTexto">
              <strong>Tipo:</strong> {product.type}
            </p>
            <button
              className="estiloParaBoton"
              onClick={() => addToCart(product)}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
