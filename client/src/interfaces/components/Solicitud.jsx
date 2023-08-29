import { FiBell } from "react-icons/fi";
import { useState, useEffect, useContext } from "react";
import Modal from "../../components/Modal";
import useStudents from "../../utils/hooks/useStudents";
import axios from "axios";
import io from "socket.io-client";
import { StoreContext } from "../../store/ContextExample";

const Solicitud = () => {
  const [showModal, setShowModal] = useState(false);
  // const { solicitudes, setSolicitudes } = useStudents();

  ////////////////////////////////////////////////
  const [solicitudes, setSolicitudes] = useState([]);
  const { state, dispatch } = useContext(StoreContext);
  // const [socket, setSocket] = useState(null);
  const [check, setCheck] = useState(true);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let s = io(
        `http://localhost:3000?token=${localStorage.getItem("token")}`
      );
      setSocket(s);
      // dispatch({ type: "SOCKET", socket: s });
    }
  }, [localStorage.getItem("token")]);

  // useEffect(() => {
  //     console.log("io: ",s)
  //     setSocket(s);
  //     dispatch({ type: "SOCKET", socket: s });
  // }, [s]);

  const getSolicitudes = async () => {
    const res = await axios(
      `http://localhost:3000/registro/contacts/requestspendings/${state.user.ID_USER}`
    );
    const results = await Promise.resolve(res);

    console.log("Solicitudes Pendientes: ", res.data);
    setSolicitudes(results.data.pendingRequests);
  };

  useEffect(() => {
    console.log('escuchando1: ')
      socket?.on("getSolicitud", async (msg) => {
        await getSolicitudes();
      });
  }, [socket]);

  useEffect(() => {
    const soli = async () => {
      await getSolicitudes();
    };
    soli();
  }, [state.user.ID_USER, socket]);

  const AceptSolicitud = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/registro/contacts/contact-requests/${id}/accept`
      );
      setSolicitudes(
        solicitudes.filter((solicitud) => solicitud.requestId !== id)
      );

      console.log("respuesta de solicitudes :", res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/registro/contacts/contact-requests/${id}/reject`
      );
      setSolicitudes(
        solicitudes.filter((solicitud) => solicitud.requestId !== id)
      );
      console.log("Data de eliminacion :", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative flex justify-center items-center bg-gray-100 hover:bg-gray-200 w-12 h-12 rounded-full">
        <FiBell
          className="h-16 w-6 text-gray-500 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        {solicitudes.length > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center w-5 h-5">
            {solicitudes.length}
          </span>
        )}
      </div>
      <Modal Visible={showModal} Close={() => setShowModal(false)}>
        <div className="p-4">
          {solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => (
              <form
                className="bg-white rounded-lg p-3 shadow mb-2"
                onSubmit={handleSubmit}
                key={solicitud.requestId}
              >
                <div className="mb-5">
                  <p className="text-lg text-gray-700 font-bold uppercase">
                    {solicitud.senderName}
                  </p>
                  <p className="text-lg font-black text-gray-600">
                    <span className="text-black font-bold">Nº</span>
                    {solicitud.senderAccountNumber}
                  </p>
                  <span className="text-sm font-bold text-gray-400 mt-5">
                    Te envio una solcitud de contacto
                  </span>
                  <div className="flex justify-center gap-5 mt-2">
                    <button
                      className="text-white text-sm font-bold bg-sky-500 hover:bg-sky-600 rounded-md shadow py-2 px-3"
                      onClick={() => AceptSolicitud(solicitud.requestId)}
                      type="button"
                    >
                      Confirmar
                    </button>
                    <button
                      className="text-black text-sm font-bold bg-gray-300 hover:bg-gray-400 rounded-md shadow py-2 px-3"
                      onClick={() => handleDelete(solicitud.requestId)}
                      type="button"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </form>
            ))
          ) : (
            <p className="text-xl font-black text-black">
              No tiendes solicitudes de contacto pendientes
            </p>
          )}
        </div>
      </Modal>
    </>
  );
  {
  }
};

export default Solicitud;
