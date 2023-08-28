import { useState, useContext } from "react";
import Modal2 from "../../../components/Modal2";
import FormCarrera from "./FormCarrera";
import { Link } from "react-router-dom";
import StudentContext from "../../ViewStudent/context/StudentContext";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const CambioCarrera = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const { stateStudent } = useContext(StudentContext);
  const [showModal, setShowModal] = useState(false);
  console.log("ESTADO ESTUDIANTE", stateStudent);
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
            Solicitud de Cambio de Carrera
          </p>
        </div>
        <div className="flex justify-around mt-5">
          <div className="">
            <p className="text-sm font-bold text-gray-700">
              Centro de Estudios:{" "}
              <span className="text-gray-500 uppercase">
                {stateStudent.user.user.CENTER}
              </span>{" "}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">
              Indice Global:{" "}
              <span className="text-gray-500">
                {stateStudent.indexAcademicGlobal}%
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-around mt-3">
          <div className="">
            <p className="text-sm font-bold text-gray-700">
              Carrera Actual:{" "}
              <span className="text-gray-500 uppercase">
                {stateStudent.user.CAREER}
              </span>{" "}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">
              Numero de Cuenta:{" "}
              <span className="text-gray-500 uppercase">
                {stateStudent.user.user.ACCOUNT_NUMBER}
              </span>{" "}
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
            <Link to="/solicitudes-estudiantes ">
              <button className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg shadow-md rounded">
                Ver Solicitudes
              </button>
            </Link>
          </div>
          <div className="mt-5">
            <Link to="/dictamen-carrera">
              <button className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-lg shadow-md rounded">
                Ver Dictamen
              </button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CambioCarrera;
