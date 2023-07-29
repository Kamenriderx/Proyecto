import { Link } from "react-router-dom";

const Requests = () => {
  return (
    <div className="container mx-auto">
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
              to="/certificacion-estudios"
              className="py-3 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-md shadow-md rounded"
            >
              Solicitud de Certificación de Estudios
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Requests;
