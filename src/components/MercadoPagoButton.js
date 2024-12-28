import React, { useEffect } from "react";

const MercadoPagoButton = ({ preferenceId }) => {
  useEffect(() => {
    if (!preferenceId) return; // No hacer nada si no hay un preferenceId válido

    // Verificar si el SDK de Mercado Pago ya está cargado
    const isSDKLoaded = !!window.MercadoPago;
    if (!isSDKLoaded) {
      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.async = true;
      script.onload = () => initializeMercadoPago(preferenceId); // Inicializar cuando el SDK esté cargado
      document.body.appendChild(script);
    } else {
      initializeMercadoPago(preferenceId); // Inicializar directamente si ya está cargado
    }

    // Limpiar al desmontar el componente
    return () => {
      const buttonContainer = document.getElementById("mercado-pago-button");
      if (buttonContainer) {
        buttonContainer.innerHTML = ""; // Eliminar el botón
      }
    };
  }, [preferenceId]);

  // Función para inicializar Mercado Pago
  const initializeMercadoPago = (preferenceId) => {
    const mp = new window.MercadoPago(
      "APP_USR-0b32ed69-db60-48b8-bc6c-4efbca600684",
      {
        locale: "es-CL", // Cambia según tu región
      }
    );

    mp.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "#mercado-pago-button", // ID del contenedor del botón
        label: "Pagar con Mercado Pago", // Texto del botón
      },
    });
  };

  return <div id="mercado-pago-button"></div>; // Contenedor único del botón
};

export default MercadoPagoButton;
