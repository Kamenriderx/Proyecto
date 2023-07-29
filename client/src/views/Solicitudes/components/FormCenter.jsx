import { useState } from "react";
/* import AlertTwo from "../../../components/AlertTwo"; */

const FormCenter = ({ setShowModal }) => {
  const [centerSelected, setCenterSelected] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [comprobante, setComprobante] = useState(null);

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    setComprobante(file);
  };

  const handleClick = () => {
    setShowModal(false);
  };

  return (
    <form
      /* onSubmit={handleSubmit} */
      className="py-3 px-2 bg-white shadow rounded-md mt-5"
    >
      {/*  {message && <AlertTwo alerta={alerta} />} */}
      {/* <ToastContainer position="top-right" /> */}
      <div className="">
        <p className="font-semibold text-md">
          Seleccione la Carrera a la cual desea hacer el Cambio:
        </p>
      </div>
      <div className="appearance-none mx-auto w-2/3 h-auto border border-gray-300 mt-5">
        <select
          value={centerSelected}
          onChange={(e) => setCenterSelected(e.target.value)}
          className="text-center block appearance-none w-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
        >
          <option>-- Selecciona el Centro --</option>
          <option>UNAH-CURC</option>
          {/*     {carreras.map((carrera) => (
            <option value={carrera.ID_CAREER} key={carrera.ID_CAREER}>
              {carrera.NAME}
            </option> 
          ))} */}
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
