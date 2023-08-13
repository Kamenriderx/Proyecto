import { useState } from "react";
import AlertThree from "../../../components/AlertThree";

const ModalMatricula = ({ isOpen, onClose, enviarDatoAlPadre }) => {
  if (!isOpen) {
    return null;
  }

  //Alerta
  const [message, setMessage] = useState(false);
  const [alerta, setAlerta] = useState();

  //Data
  const [datos, setDatos] = useState({ tipo: 'matricula' });
  console.log(datos.area, " ", datos.clase, " ", datos.seccion);

  //Enviar datos a componente Padre: TablaMatricula
  const handleClick = () => {
    enviarDatoAlPadre(datos);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <table className="text-lg text-left text-gray-700 border border-black mb-4">
            <thead className="text-xl text-black uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ÁREA
                </th>
                <th scope="col" className="px-6 py-3">
                  CLASE
                </th>
                <th scope="col" className="px-6 py-3">
                  SECCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-60">
                  <select
                    value={datos.area}
                    onChange={(event) =>
                      setDatos({ ...datos, area: event.target.value })
                    }
                    size="8"
                    className="bg-gray-50 text-gray-900 text-md w-full border-none focus:border-none focus:ring-0"
                  >
                    <option>area 1</option>
                    <option>area 2</option>
                    <option>area 3</option>
                    <option>area 4</option>
                    <option>area 5</option>
                  </select>
                </td>
                <td className="w-60">
                  <select
                    value={datos.clase}
                    onChange={(event) =>
                      setDatos({ ...datos, clase: event.target.value })
                    }
                    size="8"
                    className="bg-gray-50 text-gray-900 text-md w-full border-none focus:border-none focus:ring-0"
                  >
                    <option>clase 1</option>
                    <option>clase 2</option>
                    <option>clase 3</option>
                    <option>clase 4</option>
                    <option>clase 5</option>
                    <option>clase 6</option>
                  </select>
                </td>
                <td className="w-60">
                  <select
                    value={datos.seccion}
                    onChange={(event) =>
                      setDatos({ ...datos, seccion: event.target.value })
                    }
                    size="8"
                    className="bg-gray-50 text-gray-900 text-md w-full border-none focus:border-none focus:ring-0"
                  >
                    <option>seccion 1</option>
                    <option>seccion 2</option>
                    <option>seccion 3</option>
                    <option>seccion 4</option>
                    <option>seccion 5</option>
                    <option>seccion 6</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between">
            <p>Obs:</p>
            <div className="flex gap-2">
              <button
                onClick={handleClick}
                className="p-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
              >
                Adicionar
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
      </div>
      {message && (
        <>
          <AlertThree alerta={alerta} />
        </>
      )}
    </>
  );
};

export default ModalMatricula;
