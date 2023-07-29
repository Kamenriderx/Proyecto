import { useState, useEffect } from "react";
import axios from "axios";
import AlertTwo from "../../components/AlertTwo";

const RequestStudent = () => {
  const [listRequest, setListRequest] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    const getListRequest = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios(
          "http://localhost:3000/registro/request/getMyRequest",
          config
        );
        setListRequest(response.data.request);
        console.log(response.data.request);
      } catch (error) {
        console.log(error);
      }
    };
    getListRequest();
  }, []);

  const CancelRequest = async (ID_REQUEST) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const RESPONSE = "Cancelada";
    try {
      const response = await axios.put(
        "http://localhost:3000/registro/request/cancelledRequest",
        { ID_REQUEST, RESPONSE },
        config
      );
      setAlerta({
        message: "Solicitud Cancelada",
        error: false,
      });
      setEstado(!estado);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Listado de Solicitudes de Estudiante", listRequest);

  const { message } = alerta;

  return (
    <>
      <div className="container mx-auto mt-10">
        {message && <AlertTwo alerta={alerta} />}
        <div className="text-center mb-10">
          <p className="text-red-800 text-2xl font-bold">
            Estado de solicitudes realizadas
          </p>
        </div>
        {listRequest.length > 0 ? (
          <table className="w-full bg-white shadow-md table-auto">
            <thead className="bg-blue-800 text-white">
              <tr className="">
                <th className="p-2">Carrera Actula</th>
                <th className="p-2">Solicitud de Cambio</th>
                <th className="p-2">Correo Institucional</th>
                <th className="p-2">Centro</th>
                <th className="p-2">Justificacion</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Obs</th>
              </tr>
            </thead>
            <tbody>
              {listRequest.map((solicitudes) => (
                <tr className="border-b" key={solicitudes.ID_REQUEST}>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    {solicitudes.student.CAREER}
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    {solicitudes.TYPE}
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    {solicitudes.student.INSTITUTIONAL_EMAIL}
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    {solicitudes.student.user.CENTER}
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    {solicitudes.JUSTIFY}
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    {solicitudes.STATE}
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    {solicitudes.STATE === "Pendiente" && (
                      <button
                        onClick={() => CancelRequest(solicitudes.ID_REQUEST)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                      >
                        {estado ? "Cancelada" : "Cancelar"}
                      </button>
                    )}
                    {solicitudes.STATE === "Aceptada" && (
                      <p className="text-green-800 font-bold text-lg">
                        Solicitud Aceptada
                      </p>
                    )}
                    {solicitudes.STATE === "Denegada" && (
                      <p className="text-red-800 font-bold text-lg">
                        Solicitud Rechazada
                      </p>
                    )}
                    {solicitudes.STATE === "Cancelada" && (
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded">
                        Cancelada
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <p className="text-black font-bold text-2xl">
              No tienes solicitudes realizadas
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RequestStudent;
