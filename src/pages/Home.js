import React from "react";

function Home() {
  return (
    <main className="home-container">
      <div className="titulo-tienda">
        <h1>Telas Algodón Verde</h1>
      </div>

      <div className="intro-content">
        <h2>Bienvenidos a Telas Algodón Verde</h2>
        <p>
          Descubre nuestra exclusiva colección de telas de alta calidad.
          Ofrecemos una amplia variedad de texturas y colores, perfectas para
          cualquier proyecto de costura o moda.
        </p>
        <p>
          Aquí podrás comprar telas de algodón y lino para prendas de ropa como
          para tapizar y lograr un ambiente más agradable y sostenible.
        </p>
      </div>

      <div className="fabric-process-section">
        <img
          src="/fabrica.jpg"
          alt="Proceso de fabricación"
          className="process-image"
        />

        <div className="process-description">
          <p>
            Cómo son hechas nuestras telas: Cada pieza de tela es creada con
            atención al detalle, utilizando técnicas tradicionales combinadas
            con tecnología moderna para garantizar la más alta calidad y
            sostenibilidad.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Home;
