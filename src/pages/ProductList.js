import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://192.168.4.101:3000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id || product._id} className="product-card">
          <Link to={`/products/${product.id || product._id}`}>
            <img
              src={product.img}
              alt={product.name}
              className="product-image"
            />
          </Link>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="product-price">Marca: {product.brand}</p>
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
