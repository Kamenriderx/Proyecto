import { useState } from "react";
import TablaMatricula from "./components/TablaMatricula";
import ModalMatricula from "./components/ModalMatricula";
import ModalSeccionEspera from "./components/ModalSeccionEspera";


const AdicionarClase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const recibirDatoDelHijo = (datos) => {
    console.log(datos)
  };

  return (
    <div className="mx-16 mt-32 ">


      <div className="grid grid-cols-4 gap-4 p-4  border border-black bg-gray-200">
        <div>
          <p className="font-bold text-xl">Nombre</p>
          <p className="text-gray-700 text-lg">Nelson Guevara</p>
        </div>
        <div>
          <p className="font-bold text-xl">Índice de periodo</p>
          <p className="text-gray-700 text-lg">44</p>
        </div>
        <div>
          <p className="font-bold text-xl">Centro</p>
          <p className="text-gray-700 text-lg">Ciudad Universitaria</p>
        </div>
        <div>
          <p className="font-bold text-xl">Número de Cuenta</p>
          <p className="text-gray-700 text-lg">20181031564</p>
        </div>
        <div>
          <p className="font-bold text-xl">Carrera</p>
          <p className="text-gray-700 text-lg">Sistemas</p>
        </div>
        <div>
          <p className="font-bold text-xl">Índice global</p>
          <p className="text-gray-700 text-lg">88</p>
        </div>
        <div>
          <p className="font-bold text-xl">Año</p>
          <p className="text-gray-700 text-lg">2023</p>
        </div>
        <div>
          <p className="font-bold text-xl">UV</p>
          <p className="text-gray-700 text-lg">25</p>
        </div>
      </div>

      <button
        onClick={openModal}
        className="my-4 py-3 px-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
      >
        Adicionar Asignatura
      </button>
      <TablaMatricula />
      <ModalMatricula isOpen={isModalOpen} onClose={closeModal} enviarDatoAlPadre ={recibirDatoDelHijo} />
    </div>
  );
};

export default AdicionarClase;
