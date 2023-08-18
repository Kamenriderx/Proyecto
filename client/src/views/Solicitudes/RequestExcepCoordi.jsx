import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AlertTwo from "../../components/AlertTwo";
import { StoreContext } from "../../store/ContextExample";
const RequestExcepCoordi = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [solicitudesExcepCoordi, setSolicitudesExcepCoordi] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const getSolicitudes = async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (!token) return;
      try {
        const response = await axios(
          `http://localhost:3000/registro/request/listRequestCancellationExceptional/${state.user.ID_USER}`,
          config
        );
        setSolicitudesExcepCoordi(response.data.request);
        console.log(response.data.request);
      } catch (error) {
        console.log(error);
      }
    };
    getSolicitudes();
  }, [check]);

  console.log("SOLICITUDES EXCEPCIONALES", solicitudesExcepCoordi);

  const aceptedSolicitud = async (ID_REQUEST, ID_STUDENT) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (!token) return;

    const RESPONSE = "Aceptada";
    try {
      const response = await axios.put(
        "http://localhost:3000/registro/request/responseRequest",
        { ID_REQUEST, RESPONSE, ID_STUDENT },
        config
      );
      console.log(response);
      setAlerta({
        message: "Solicitud Aceptada",
        error: false,
      });
      setCheck(!check);
    } catch (error) {
      console.log(error);
    }
  };

  const denegarSolicitud = async (ID_REQUEST, ID_STUDENT) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (!token) return;

    const RESPONSE = "Denegada";
    try {
      const response = await axios.put(
        "http://localhost:3000/registro/request/responseRequest",
        { ID_REQUEST, RESPONSE, ID_STUDENT },
        config
      );
      console.log(response);
      setAlerta({
        message: "Solicitud Denegada",
        error: true,
      });
      setCheck(!check);
    } catch (error) {
      console.log(error);
    }
  };

  const { message } = alerta;

  return (
    <div className="flex mt-10">
      <div className="container mx-auto mt-10">
        {message && <AlertTwo alerta={alerta} />}
        <div className="text-center mb-10">
          <p className="text-red-800 text-2xl font-bold">
            Estado de solicitudes por cambio de centro
          </p>
        </div>
        {solicitudesExcepCoordi.length > 0 ? (
          <table className="w-full bg-white shadow-md table-auto">
            <thead className="bg-blue-800 text-white">
              <tr className="">
                <th className="p-2">Centro</th>
                <th className="p-2">Carrera</th>
                <th className="p-2">Correo Institucional</th>
                <th className="p-2">Numero de Cuenta</th>
                <th className="p-2">Justificacion</th>
                <th className="p-2">Obs</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesExcepCoordi.map((solicitudes) => (
                <tr className="border-b" key={solicitudes.ID_REQUEST}>
                  <td className="border px-4 py-2 text-md font-bold r">
                    {solicitudes.student.user.CENTER}
                  </td>
                  <td className="border px-4 py-2 text-md font-bold r">
                    {solicitudes.student.CAREER}
                  </td>
                  <td className="border px-4 py-2 text-md font-bold r">
                    {solicitudes.student.INSTITUTIONAL_EMAIL}
                  </td>
                  <td className="border px-4 py-2 text-md font-bold r">
                    {solicitudes.student.user.ACCOUNT_NUMBER}
                  </td>
                  <td className="border px-4 py-2 text-md font-bold r">
                    {solicitudes.JUSTIFY}
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    <div className="flex justify-around gap-2">
                      <button
                        onClick={() =>
                          aceptedSolicitud(
                            solicitudes.ID_REQUEST,
                            solicitudes.student.ID_STUDENT
                          )
                        }
                        className="py-2 px-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded shadow"
                      >
                        Aceptar
                      </button>
                      <button
                        onClick={() =>
                          denegarSolicitud(
                            solicitudes.ID_REQUEST,
                            solicitudes.student.ID_STUDENT
                          )
                        }
                        className="py-2 px-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow"
                      >
                        Denegar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <p className="text-black font-bold text-2xl">
              Sin solicitudes Excepcionales
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestExcepCoordi;
