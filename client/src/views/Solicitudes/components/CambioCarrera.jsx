import { useState } from "react";
import Modal2 from "../../../components/Modal2";
import FormCarrera from "./FormCarrera";

const CambioCarrera = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container mx-auto">
      <Modal2 Visible={showModal} Close={() => setShowModal(false)}>
        <div className="text-center rounded-md bg-sky-700 shadow">
          <p className="text-white font-semibold text-lg uppercase">
            Solicitud de Cambio de Carrera
          </p>
        </div>
        <div className="flex justify-around mt-5">
          <div className="">
            <p className="text-sm font-bold text-gray-700">
              Centro de Estudios:{" "}
              <span className="text-gray-500 uppercase">
                ciudad universitaria
              </span>{" "}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">
              Indice Global: <span className="text-gray-500">80%</span>{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-around mt-3">
          <div className="">
            <p className="text-sm font-bold text-gray-700">
              Carrera Actual:{" "}
              <span className="text-gray-500 uppercase">
                Ingenieria en sistemas
              </span>{" "}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">
              Indice Admision:{" "}
              <span className="text-gray-500 uppercase">1050</span>{" "}
            </p>
          </div>
        </div>
        <div className="py-2 px-2">
          <FormCarrera setShowModal={setShowModal} />
        </div>
      </Modal2>
      <div>
        <div className="mt-10">
          <p className="text-red-800 font-bold text-md">
            SOLICITUDES -{" "}
            <span className="text-red-800 uppercase text-lg">
              cambio de carrera
            </span>
          </p>
          <p className="text-gray-500 font-semibold text-md">
            Solicitudes de cambio de Carrera
          </p>
        </div>
        <aside className="md:w-80 lg:w-96 px-5 py-10">
          <div className="mt-5">
            <button
              onClick={() => setShowModal(true)}
              className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg shadow-md rounded"
            >
              Realizar Soicitud
            </button>
          </div>
          <div className="mt-5">
            <button className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg shadow-md rounded">
              Borrar Solicitud
            </button>
          </div>
          <div className="mt-5">
            <button className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg shadow-md rounded">
              Ver Dictamen
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CambioCarrera;
