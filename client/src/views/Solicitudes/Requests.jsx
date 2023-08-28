import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
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
      <div>
        <div className="mt-10">
          <p className="text-red-800 font-bold text-lg block">SOLICITUDES</p>
          <p className="text-gray-500 font-semibold text-md">
            Solicitudes de cambios y emisión de documentos
          </p>
        </div>
        <aside className="md:w-80 lg:w-3/5 px-5 py-10">
          <div className="mt-5">
            <Link
              to="/cambio-carrera"
              className="py-3 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-md shadow-md rounded"
            >
              Solicitud de Cambio de Carrera
            </Link>
          </div>
          <div className="mt-10">
            <Link
              to="/solicitudes-centro"
              className="py-3 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-md shadow-md rounded"
            >
              Solicitud de Cambio de Centro
            </Link>
          </div>
          <div className="mt-10">
            <Link
              to="/pago-reposicion"
              className="py-3 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-md shadow-md rounded"
            >
              Activación de pago para examen de reposición
            </Link>
          </div>
          <div className="mt-10">
            <Link
              to="/cancelacion-excep"
              className="py-3 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-md shadow-md rounded"
            >
              Solicitud de Cancelacion Excepcional
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Requests;
