import { useState, useEffect } from "react";
import axios from "axios";

const ObtenerSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const getSolicitudes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios(
          "http://localhost:3000/registro/request/requestChangeCareer",
          config
        );
        setSolicitudes(response);
        console.log("RESPUESTA", response);
      } catch (error) {
        console.log(error);
      }
    };
    getSolicitudes();
  }, []);
  console.log("SOLICITUDES DEL COORDINADOR", solicitudes);
  return (
    <div>
      <h1>Apartado de Solicitudes</h1>
    </div>
  );
};

export default ObtenerSolicitudes;
