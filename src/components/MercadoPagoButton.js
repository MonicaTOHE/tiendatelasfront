import React, { useEffect } from "react";

const MercadoPagoButton = ({ preferenceId }) => {
  useEffect(() => {
    // Cargar el SDK de Mercado Pago
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => {
      // Inicializar Mercado Pago
      const mp = new window.MercadoPago(
        "APP_USR-0b32ed69-db60-48b8-bc6c-4efbca600684",
        { locale: "es-CL" }
      );

      console.log("PASO", preferenceId);
      // Renderizar el botón de pago
      mp.checkout({
        preference: {
          id: preferenceId, // El ID de la preferencia generado por tu backend
        },
        render: {
          container: "#mercado-pago-button", // ID del contenedor donde se renderiza el botón
          label: "Pagar con Mercado Pago", // Texto del botón
        },
      });
    };
    document.body.appendChild(script);
  }, [preferenceId]);

  return <div id="mercado-pago-button"></div>; // Contenedor del botón
};

export default MercadoPagoButton;
