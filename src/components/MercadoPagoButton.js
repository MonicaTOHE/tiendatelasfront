import React, { useEffect } from "react";

const MercadoPagoButton = ({ preferenceId }) => {
  useEffect(() => {
    if (!preferenceId) return; // Evitar inicializar si no hay un preferenceId válido

    // Verificar si el SDK ya está cargado
    if (!window.MercadoPago) {
      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.async = true;
      script.onload = () => initializeMercadoPago(preferenceId);
      document.body.appendChild(script);
    } else {
      initializeMercadoPago(preferenceId);
    }

    // Limpieza al desmontar el componente
    return () => {
      const container = document.getElementById("mercado-pago-button");
      if (container) container.innerHTML = ""; // Limpiar contenido del contenedor
    };
  }, [preferenceId]);

  // Función para inicializar Mercado Pago
  const initializeMercadoPago = (preferenceId) => {
    const mp = new window.MercadoPago(
      "APP_USR-0b32ed69-db60-48b8-bc6c-4efbca600684",
      {
        locale: "es-CL",
      }
    );

    mp.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "#mercado-pago-button", // ID del contenedor del botón
        label: "Pagar con Mercado Pago",
      },
    });
  };

  return <div id="mercado-pago-button"></div>; // Contenedor único del botón
};

export default MercadoPagoButton;
