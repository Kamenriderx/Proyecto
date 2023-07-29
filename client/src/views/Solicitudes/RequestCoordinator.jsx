import { useState, useEffect } from "react";
import axios from "axios";

const RequestCoordinator = () => {
  const [solicitudesCordi, setSolicitudesCordi] = useState([]);

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
          "http://localhost:3000/registro/request/listRequestChangeCareer",
          config
        );
        setSolicitudesCordi(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      getSolicitudes();
    };
  }, []);

  console.log("SOLICITUDES DEL COORDINADOR", solicitudesCordi);
  return (
    <div className="container mx-auto mt-10">
      Aquie las solicitudes del Coordi
    </div>
  );
};

export default RequestCoordinator;
