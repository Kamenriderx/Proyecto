import { useState } from "react";
import AlertTwo from "../../../components/AlertTwo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const FormCenter = ({ setShowModal }) => {
  const [centerSelected, setCenterSelected] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [comprobante, setComprobante] = useState(null);
  const [alerta, setAlerta] = useState({});

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    setComprobante(file);
  };

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([centerSelected, mensaje].includes("")) {
      setAlerta({
        message: "Todos los Campos son obligatorios",
        error: true,
      });
      return;
    }
    if (comprobante === null) {
      setAlerta({
        message: "Debe adjuntar el pago de cambio de centro",
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
      formData.append("CENTER", centerSelected);
      formData.append("pdfFile", comprobante);

      const response = await axios.post(
        "http://localhost:3000/registro/request/requestChangeCenter",
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
      setCenterSelected("");
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
      <div className="">
        <p className="font-semibold text-md">
          Seleccione el centro al cual desea hacer el Cambio:
        </p>
      </div>
      <div className="appearance-none mx-auto w-2/3 h-auto border border-gray-300 mt-5">
        <select
          value={centerSelected}
          onChange={(e) => setCenterSelected(e.target.value)}
          className="text-center block appearance-none w-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
        >
          <option>-- Selecciona el Centro --</option>
          <option value="Ciudad Universitaria">UNAH-CU</option>
          <option value="CENTRO UNIVERSITARIO REGIONAL DEL CENTRO">
            UNAH-CURC
          </option>
          <option value="UNAH Valle de Sula">UNAH-VS</option>
          <option value="Centro Universitario Regional de Litoral Atlántico">
            UNAH-CURLA
          </option>
          <option value="Centro Universitario Regional del Litoral Pacífico">
            UNAH-CURLP
          </option>
          <option value="Centro Universitario Regional de Occidente">
            UNAH-CUROC
          </option>
          <option value="Centro Universitario Regional Nororiental">
            UNAH-CURNO
          </option>
          <option value="Centro Tecnológico de Danlí">UNAH-TEC Danli</option>
          <option value="Centro Tecnológico del Valle del Aguán">
            UNAH-TEC AGUÁN
          </option>
        </select>
      </div>
      <div className="mt-5">
        <p className="font-semibold text-md">
          Razones por las Cuales desea realizar el cambio :
        </p>
      </div>
      <div className="mt-5 mx-auto w-2/3 h-36">
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="appearance-none w-full h-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-5">
        <p className="font-semibold text-md">Comprobante de Pago:</p>
      </div>
      <div className="mt-2 mx-auto w-2/3 ">
        <input
          type="file"
          accept="application/pdf"
          className="w-full py-2 px-3"
          onChange={handlePdfChange}
        />
      </div>
      <div className="mt-5 flex justify-around">
        <div>
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 rounded-md shadow"
          >
            Realizar solicitud
          </button>
        </div>
        <div>
          <button
            onClick={handleClick}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-10 rounded-md shadow"
          >
            Salir
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormCenter;
