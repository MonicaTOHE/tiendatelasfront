import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartContext"; // Ruta relativa ajustada

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://192.168.4.101:3000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.img} alt={product.name} style={{ maxWidth: "100%" }} />
      <p>{product.description}</p>
      <p>Marca: {product.brand}</p>
      <button className="button" onClick={() => addToCart(product)}>
        Agregar al Carrito
      </button>
    </div>
  );
}

export default ProductDetail;
