import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../store/ContextExample";
import axios from "axios";
import Modal2 from "../../components/Modal2";
import { AiFillCheckCircle } from "react-icons/ai";
const MatriculaEstudiante = () => {
  const { state, periodo } = useContext(StoreContext);
  const [estado, setEstado] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getEstado = async () => {
      try {
        const response = await axios(
          `http://localhost:3000/registro/student/getInfoAccount/${state.user.ID_USER}`
        );
        setEstado(response.data.studentInfo);
        console.log("ESTADO CUENTA", response.data.studentInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getEstado();
  }, [state.user.ID_USER]);
  console.log("ESTADO CUENTA VAR", estado);
  return (
    <div className="container mx-auto">
      <Modal2 Visible={showModal} Close={() => setShowModal(false)}>
        <div className="text-center mt-5">
          <div>
            <p className="text-gray-700 text-xl font-bold uppercase">
              Detalle de pago
            </p>
          </div>
          <div className="mt-5 mb-5">
            <>
              <table className="w-full bg-white shadow-md table-auto">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="p-2">Descripcion</th>
                    <th className="p-2">Valor</th>
                    <th className="p-2">Pagado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="border px-4 py-2 text-sm font-medium r">
                      CAMBIO DE CARRERA
                    </td>
                    <td className="text-center border px-4 py-2 text-sm font-medium r">
                      200.00
                    </td>
                    <td className="text-center border px-4 py-2 text-sm font-medium r">
                      {estado.CHANGE_CAREER_PAYMENT === 0 ? (
                        <div className="flex justify-center items-center">
                          <AiFillCheckCircle color="#B6C6B0" size={20} />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <AiFillCheckCircle color="#4FBC26" size={20} />
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 text-sm font-medium r">
                      CAMBIO DE CENTRO
                    </td>
                    <td className="text-center border px-4 py-2 text-sm font-medium r">
                      150.00
                    </td>
                    <td className="text-center border px-4 py-2 text-sm font-medium r">
                      {estado.CHANGE_CENTER_PAYMENT === 0 ? (
                        <div className="flex justify-center items-center">
                          <AiFillCheckCircle color="#B6C6B0" size={20} />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <AiFillCheckCircle color="#4FBC26" size={20} />
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 text-sm font-medium r">
                      MATRICULA {periodo.PERIOD_NAME}
                    </td>
                    <td className="text-center border px-4 py-2 text-sm font-medium r">
                      270.00
                    </td>
                    <td className="text-center border px-4 py-2 text-sm font-medium r">
                      {estado.REGISTRATION_PAYMENT === 0 ? (
                        <div className="flex justify-center items-center">
                          <AiFillCheckCircle color="#B6C6B0" size={20} />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <AiFillCheckCircle color="#4FBC26" size={20} />
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          </div>
        </div>
      </Modal2>
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
          <div className="mt-10">
            <Link
              onClick={() => setShowModal(true)}
              className="py-3 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-md shadow-md rounded"
            >
              Estado de Cuenta
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MatriculaEstudiante;
