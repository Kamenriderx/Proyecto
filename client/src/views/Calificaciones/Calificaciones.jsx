import { BsCheckCircleFill } from "react-icons/bs";
import Modal from "./components/Modal.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpRequests } from "../../utils/helpers/httpRequests.js";
import StudentContext from "../ViewStudent/context/StudentContext.jsx";
import { StoreContext } from "../../store/ContextExample.jsx";

const Calificaciones = () => {
  //contexto de usuario
  const { state } = useContext(StoreContext);
  //contexto de estudiante
  const { stateStudent, getStudent } = useContext(StudentContext);
  //id Seccion
  const [idSeccion, setIdSeccion] = useState(null);

  //datos recibidos
  const [datosRecibidos, setDatosRecibidos] = useState([]);

  const [dataStudent, setdataStudent] = useState(null);
  // console.log("idStudent: ", stateStudent.user.ID_STUDENT);

  const [secciones, setSecciones] = useState(null);
  const getSeccion = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/evaluateProffesor/${stateStudent.user.ID_STUDENT}`,
        { ...config }
      );

      console.log("GET_SECCION: ", res.data);
      setSecciones(res.data);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [evaluacion, setEvaluacion] = useState(null);
  const getEvaluacion = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/evaluateProffesor/evaluations/${stateStudent.user.ID_STUDENT}`,
        { ...config }
      );

      console.log("GET_EVALUACION: ", res.data);
      setEvaluacion(res.data);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent(state);
    getSeccion();
  }, [state]);

  useEffect(() => {
    getEvaluacion();
  }, [datosRecibidos]);

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const [check, setCheck] = useState(false);
  const [calificar, setCalificar] = useState(false);

  //Recibir datos de Ventana Modal
  const recibirDatoDelHijo = (datos) => {
    console.log("datos recibidos: ", datos);
    setDatosRecibidos([...datosRecibidos, datos]);
  };

  const handleClick = () => {
    if (evaluacion.length >= 1 && evaluacion.length == secciones.length) {
      navigate("/calificaciones-ingresadas");
    } else {
      setCalificar(false);
      openModal();
    }
  };

  return (
    <div className="mx-16 mt-32 ">
      <button
        className="p-3 mb-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
        onClick={handleClick}
      >
        Ver calificaciones
      </button>
      <div className="relative overflow-x-auto rounded-xl shadow-xl shadow-blue-200">
        <table className="w-full text-lg text-left text-gray-700 ">
          <thead className="text-xl text-black uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                CLASE
              </th>
              <th scope="col" className="px-6 py-3">
                SECCIÓN
              </th>
              <th scope="col" className="px-6 py-3">
                OBSERVACIÓN
              </th>
            </tr>
          </thead>
          <tbody>
            {secciones && (
              <>
                {secciones.map((seccion, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{seccion.COURSE_NAME}</td>
                    <td className="px-6 py-4">{seccion.SECTION_CODE}</td>
                    <td className="px-6 py-4">
                      <button
                        className="p-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
                        onClick={() => {
                          setIdSeccion(seccion.ID_SECTION);
                          setCalificar(true);
                          openModal();
                        }}
                      >
                        Calificar
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        enviarDatoAlPadre={recibirDatoDelHijo}
        calificar={calificar}
        idSeccion={idSeccion}
        idStudent={stateStudent.user.ID_STUDENT}
      />
    </div>
  );
};
export default Calificaciones;
