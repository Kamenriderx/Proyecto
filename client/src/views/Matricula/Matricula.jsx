import { Link } from "react-router-dom";

const Matricula = () => {
  return (
    <div className="container mx-auto">
      <div>
        <div className="mt-10">
          <p className="text-red-800 font-bold text-lg block">MATRÍCULA</p>
          <p className="text-gray-500 font-semibold text-md">
            Bienvenido a la sección de matrícula.
          </p>
        </div>
        <aside className="md:w-80 lg:w-3/5 px-5 py-10">
          <div className="mt-5">
            <Link
              to="/matricula/adicionar-clase"
              className="py-3 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-md shadow-md rounded"
            >
              Adicionar clase
            </Link>
          </div>
          <div className="mt-10">
            <Link
              to="/matricula/cancelar-clase-matriculada"
              className="py-3 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-md shadow-md rounded"
            >
              Cancelar clase matrículada
            </Link>
          </div>
          <div className="mt-10">
            <Link
              to="/matricula/cancelar-clase-espera"
              className="py-3 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-md shadow-md rounded"
            >
              Cancelar clase en espera
            </Link>
          </div>
          <div className="mt-10">
            <Link
              to="/matricula/forma03"
              className="py-3 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-md shadow-md rounded"
            >
              Forma 03
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Matricula;
