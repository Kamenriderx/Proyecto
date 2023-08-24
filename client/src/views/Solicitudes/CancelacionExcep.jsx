import { Link } from "react-router-dom";
import { useState } from "react";
import Modal2 from "../../components/Modal2";
import FormCancelExcep from "./components/FormCancelExcep";

const CancelacionExcep = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container mx-auto">
      <Modal2 Visible={showModal} Close={() => setShowModal(false)}>
        <div className="text-center rounded-md bg-sky-700 shadow">
          <p className="text-white font-semibold text-lg uppercase">
            Solicitud de Cancelacion Excepcional
          </p>
        </div>

        <div className="py-2 px-2">
          <FormCancelExcep setShowModal={setShowModal} />
        </div>
      </Modal2>
      <div className="flex mt-5">
        <div>
          <div className="mt-10">
            <p className="text-red-800 font-bold text-md">
              SOLICITUDES -{" "}
              <span className="text-red-800 uppercase text-lg">
                cancelaciones excepcionales
              </span>
            </p>
            <p className="text-gray-500 font-semibold text-md">
              Solicitudes de Cancelacion Excepcional
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
              <Link to="/dictamenExcep">
                <button className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg shadow-md rounded">
                  Ver Dictamen
                </button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CancelacionExcep;
