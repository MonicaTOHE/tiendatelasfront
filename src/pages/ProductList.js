import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://tiendatelasbackend-production.up.railway.app/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const formatPrice = (price) =>
    price.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  return (
    <div className=" product-list">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <Link to={`/products/${product._id}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image"
            />
          </Link>
          <div className="product-info">
            <h2 className="product-title">{product.name}</h2>
          </div>
          <div className="product-footer">
            <p className="product-price">{formatPrice(product.price)}</p>
            <button className="button" onClick={() => addToCart(product)}>
              Agregar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
