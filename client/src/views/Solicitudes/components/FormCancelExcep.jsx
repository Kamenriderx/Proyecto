import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { StoreContext } from "../../../store/ContextExample";
import AlertTwo from "../../../components/AlertTwo";

const FormCancelExcep = ({ setShowModal }) => {
  const { state, dispatch } = useContext(StoreContext);
  const [mensaje, setMensaje] = useState("");
  const [comprobante, setComprobante] = useState(null);
  const [alerta, setAlerta] = useState({});

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    setComprobante(file);
  };

  const handleClick = () => {
    setShowModal(false);
    setMensaje("");
    setComprobante("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([mensaje].includes("")) {
      setAlerta({
        message: "Todos los Campos son obligatorios",
        error: true,
      });
      return;
    }
    if (comprobante === null) {
      setAlerta({
        message: "Debe adjuntar el pdf de solicitud",
        error: true,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append("JUSTIFY", mensaje);
      formData.append("pdfFile", comprobante);

      const response = await axios.post(
        `http://localhost:3000/registro/request/requestExceptionalCancellation/${state.user.ID_USER}`,
        formData,
        config
      );
      console.log(response);
      toast.success("Solicitud Enviada Exitosamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setMensaje("");
      setComprobante(null);
    } catch (error) {
      console.log(error);
    }
  };

  const { message } = alerta;

  return (
    <form
      onSubmit={handleSubmit}
      className="py-3 px-2 bg-white shadow rounded-md mt-5"
    >
      {message && <AlertTwo alerta={alerta} />}
      <ToastContainer position="top-right" />
      <div className="w-full">
        <div>
          <div>
            <p className="text-gray-800 text-base font-bold">Justificacion :</p>
          </div>
          <div className="mt-3">
            <textarea
              className="appearance-none w-full h-28 bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-3">
            <p className="text-gray-800 text-base font-bold">
              Ingrese su documento de solicitud :
            </p>
          </div>
          <div className="mt-2 mx-auto w-2/3 ">
            <input
              type="file"
              accept="application/pdf"
              className="w-full py-2 px-3"
              onChange={handlePdfChange}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-5">
          <div>
            <button className="px-3 py-2 shadow text-white text-lg font-bold bg-sky-700 hover:bg-sky-800 rounded">
              Enviar Solicitud
            </button>
          </div>
          <div>
            {" "}
            <button
              onClick={() => handleClick()}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-10 rounded-md shadow text-lg"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormCancelExcep;
