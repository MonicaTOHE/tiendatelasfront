import React, { useEffect } from "react";

const MercadoPagoButton = ({ preferenceId }) => {
  useEffect(() => {
    if (!preferenceId) return; // No inicializar si no hay preferenceId

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => {
      const mp = new window.MercadoPago(
        "APP_USR-0b32ed69-db60-48b8-bc6c-4efbca600684", // Public Key
        { locale: "es-CL" }
      );

      mp.checkout({
        preference: {
          id: preferenceId, // Usar el preferenceId recibido como prop
        },
        render: {
          container: "#mercado-pago-button",
          label: "Pagar con Mercado Pago",
        },
      });
    };
    document.body.appendChild(script);
  }, [preferenceId]);

  return <div id="mercado-pago-button"></div>; // Contenedor del botón
};

export default MercadoPagoButton;
