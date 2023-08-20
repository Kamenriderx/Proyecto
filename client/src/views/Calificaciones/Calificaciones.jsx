import { BsCheckCircleFill } from "react-icons/bs";
import Modal from "./components/Modal.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Calificaciones = () => {
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  //datos recibidos
  const [datosRecibidos, setDatosRecibidos] = useState(null);

  const [check, setCheck] = useState(false);
  const [calificar, setCalificar] = useState(false);

  //Recibir datos de Ventana Modal
  const recibirDatoDelHijo = (datos) => {
    console.log("datos: ", datos);
  };

  const handleClick = () => {
    if (check) {
      navigate("/calificaciones-ingresadas");
    } else {
      setCalificar(false)
      openModal();
    }
  };

  return (
    <div className="mx-16 mt-32 ">
      <button
        className="p-3 mb-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
        onClick={handleClick}
      >
        Ver calificaciones
      </button>
      <div className="relative overflow-x-auto rounded-xl shadow-xl shadow-blue-200">
        <table className="w-full text-lg text-left text-gray-700 ">
          <thead className="text-xl text-black uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                CLASE
              </th>
              <th scope="col" className="px-6 py-3">
                SECCIÓN
              </th>
              <th scope="col" className="px-6 py-3">
                OBSERVACIÓN
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4">arr.seccion.course.CODE_COURSE</td>
              <td className="px-6 py-4">arr.seccion.course.NAME</td>
              <td className="px-6 py-4">
                <BsCheckCircleFill className="text-3xl text-green-500 hidden" />{" "}
                <button
                  className="p-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
                  onClick={() => {
                    setCalificar(true);
                    openModal();
                  }}
                >
                  Calificar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        enviarDatoAlPadre={recibirDatoDelHijo}
        calificar={calificar}
      />
    </div>
  );
};
export default Calificaciones;
