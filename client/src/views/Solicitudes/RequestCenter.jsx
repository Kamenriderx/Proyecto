import FormCenter from "./components/FormCenter";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal2 from "../../components/Modal2";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const RequestCenter = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container mx-auto">
      <div className="flex justify-start mx-5 mb-5">
        <div className="mt-5">
          <button
            onClick={handleBack}
            className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
          >
            <BiArrowBack color="#F7F9F7" size={20} />
          </button>
        </div>
      </div>
      <Modal2 Visible={showModal} Close={() => setShowModal(false)}>
        <div className="text-center rounded-md bg-sky-700 shadow">
          <p className="text-white font-semibold text-lg uppercase">
            Solicitud de cambio de centro
          </p>
        </div>

        <div className="py-2 px-2">
          <FormCenter setShowModal={setShowModal} />
        </div>
      </Modal2>
      <div>
        <div className="mt-10">
          <p className="text-red-800 font-bold text-md">
            SOLICITUDES -{" "}
            <span className="text-red-800 uppercase text-lg">
              Cambio de centro
            </span>
          </p>
          <p className="text-gray-500 font-semibold text-md">
            Solicitudes de cambio de Centro
          </p>
        </div>
        <aside className="md:w-80 lg:w-96 px-5 py-10">
          <div className="mt-5">
            <button
              onClick={() => setShowModal(true)}
              className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg shadow-md rounded"
            >
              Realizar soicitud
            </button>
          </div>
          <div className="mt-5">
            <Link to="/solicitudes-estudiantescenter">
              <button className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg shadow-md rounded">
                Ver solicitudes
              </button>
            </Link>
          </div>
          <div className="mt-5">
            <Link to="/dictamen-centro">
              <button className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg shadow-md rounded">
                Ver dictamen
              </button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RequestCenter;
