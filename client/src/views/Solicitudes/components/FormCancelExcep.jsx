/* import { useState } from "react";
import AlertTwo from "../../../components/AlertTwo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; */

const FormCancelExcep = () => {
  /*  const [mensaje, setMensaje] = useState("");
    const [comprobante, setComprobante] = useState(null);
    const [alerta, setAlerta] = useState({}); */

  return (
    <form className="py-3 px-2 bg-white shadow rounded-md mt-5">
      <div className="w-full">
        <div>
          <div>
            <p className="text-gray-800 text-base font-bold">Justificacion :</p>
          </div>
          <div className="mt-3">
            <textarea className="appearance-none w-full h-28 bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500" />
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
              /* onChange={handlePdfChange} */
            />
          </div>
        </div>
        <div className="flex mt-5 justify-end">
          <button className="px-3 py-2 shadow text-white text-lg font-bold bg-sky-700 hover:bg-sky-800 rounded">
            Enviar Solicitud
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormCancelExcep;
