import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../store/ContextExample";
import axios from "axios";
import AlertTwo from "../../components/AlertTwo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardTeachers = ({ student }) => {
  const { state, dispatch } = useContext(StoreContext);
  const [alerta, setAlerta] = useState({});
  const [boton, setBoton] = useState(false);

  const enviarSolicitudContacto = async () => {
    const senderId = `${state.user.ID_USER}`;
    const recipientId = `${student.user.ID_USER}`;

    try {
      const res = await axios.post(
        "http://localhost:3000/registro/contacts/contact-requests",
        { senderId, recipientId }
      );
      setBoton(true);
      console.log("Solicitud Enviada....", res.data);
      toast.success("Solicitud enviada correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      setAlerta({
        message: error.response.data.message,
        error: true,
      });
    }
  };

  /* const eliminarSolicitud = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/registro/contacts/contact-requests/${id}/cancel`
      );
      AlertTwo({
        message: "Solicitud Eliminada",
        error: false,
      });
      console.log(response.data.message);
      console.log(response.data);
    } catch (error) {
      setAlerta({
        message: error.response.data.message,
        error: true,
      });
      console.log("El errro es : ", error.response.data.message);
    }
  }; */

  const { message } = alerta;

  /*   const esRemitente = state.user.ID_USER === pendings.senderId;
const esDestinatario = state.user.ID_USER === pendings.recipientId; */

  return (
    <>
      <div className="mt-10 mx-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        {message && <AlertTwo alerta={alerta} />}
        <ToastContainer position="top-right" />
        <div className="md:flex">
          <div className="md:flex">
            <img
              className="object-cover md:w-48"
              src={student.user?.multimedia[0]?.URL}
              alt="Imagen de perfil"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-lg font-bold text-indigo-500">
              {student.user.NAME}
            </div>
            <p className="mt-2 text-gray-500 text-lg">
              <span className="font-bold text-gray-700">Carrera: </span>
              {student.CAREER}
            </p>
            <p className="mt-2 text-gray-500 text-lg">
              <span className="font-bold text-gray-700">Correo: </span>
              {student.user.EMAIL}
            </p>
            <p className="mt-2 text-gray-500 text-lg">
              <span className="font-bold text-gray-700">
                Centro de Estudio:{" "}
              </span>
              {student.user.CENTER}
            </p>
            <p className="mt-2 text-gray-500 text-lg">
              <span className="font-bold text-gray-700">
                Numero de Cuenta:{" "}
              </span>
              {student.user.ACCOUNT_NUMBER}
            </p>
            <div>
              <div className="mt-4">
                <>
                  {!boton ? (
                    <input
                      className={
                        "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                      }
                      value="Enviar Solicitud"
                      type="button"
                      onClick={enviarSolicitudContacto}
                    />
                  ) : (
                    ""
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTeachers;
