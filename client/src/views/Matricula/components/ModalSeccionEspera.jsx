import { useState } from "react";

const ModalSeccionEspera = ({ isOpen, onClose, enviarDatoAlPadre }) => {
  if (!isOpen) {
    return null;
  }

  //Data
  const [datos, setDatos] = useState({ tipo: 'seccionEspera' });
  console.log(datos.seccion);

  //Enviar datos a componente Padre: TablaMatricula
  const handleClick = () => {
    enviarDatoAlPadre(datos);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <div className="mb-4 font-bold text-lg">
          Sección llena ¿Matricular en espera?
        </div>
        <div className="mb-4">
          <select
            value={datos.seccion}
            onChange={(event) =>
              setDatos({ ...datos, seccion: event.target.value })
            }
            size="5"
            className="bg-gray-50 text-gray-900 text-md w-full border-none focus:border-none focus:ring-0"
          >
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
          </select>
        </div>

        <div className="flex justify-between gap-2">
          <button
            onClick={handleClick}
            className="p-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
          >
            Matricular
          </button>

          <button
            onClick={onClose}
            className="p-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSeccionEspera;
