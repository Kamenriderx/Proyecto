import Modal from "../../components/Modal";
import { useState } from "react";

const RequestRepo = () => {
  const [showModal, setShowModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  return (
    <div className="container mx-auto mt-10">
      <Modal Visible={showModal} Close={() => setShowModal(false)}>
        <form /* onSubmit={handleSubmit} */
          className="py-3 px-2 bg-white shadow rounded-md mt-5"
        >
          <div className="text-center">
            <p className="text-red-800 font-bold text-lg">Nueva Solicitud</p>
          </div>
          <div className="mt-5">
            <p className="font-semibold text-md">Escriba una Justificacion :</p>
          </div>
          <div className="mt-5 mx-auto w-3/4 h-36">
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="appearance-none w-full h-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-5 bg-red-50">
            <div className="p-2">
              <p className="text-red-600 font-medium">
                <span className="text-red-800 font-bold">Recuerda:</span> Al
                activar el pago de examen de reposición por medio de la
                plataforma DIPP-UNAH, podrás realizar dicho pago{" "}
                <span className="text-red-800 font-bold">ÚNICAMENTE</span> en
                Banco{" "}
                <span className="text-red-800 font-bold">
                  ATLÁNTIDA, FICOHSA, DAVIVIENDA, BANPAIS,
                </span>{" "}
                y Agencias{" "}
                <span className="text-red-800 font-bold">LAFISE</span> fuera de
                Ciudad Universitaria.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <div>
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow"
              >
                Cerrar
              </button>
            </div>
            <div>
              <button className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow">
                Enviar
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <div className="mt-5">
        <p className="text-red-800 text-lg font-bold">
          Solicitud de activacion de pago de reposicion
        </p>
      </div>
      <div className="mt-5">
        <button
          onClick={() => setShowModal(true)}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 shadow rounded-md"
        >
          Nueva Solicitud
        </button>
      </div>
      <div className="mt-10">Tabla de Solicitudes</div>
    </div>
  );
};

export default RequestRepo;
