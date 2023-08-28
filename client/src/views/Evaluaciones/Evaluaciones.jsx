import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/ContextExample";
import { httpRequests } from "../../utils/helpers/httpRequests";
import Modal from "./components/Modal";

const Evaluaciones = () => {
  //contexto de usuario
  const { state, periodo } = useContext(StoreContext);
  const [dataEvaluacion, setdataEvaluacion] = useState(null);

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getEvaluacion = async (stateUser) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/evaluateProffesor/department/${periodo.ID_PERIOD}/${stateUser.user.ID_USER}`,
        { ...config }
      );

      console.log("GET_EVALUACION: ", res.data.evaluations);
      setdataEvaluacion(res.data.evaluations);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvaluacion(state);
  }, [state.user.ID_USER]);

  return (
    <div className="mx-16 mt-28 ">
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      <button
        className="text-xl font-bold text-center mb-4"
        onClick={openModal}
      >
        VER PREGUNTAS
      </button>

      <div className="relative overflow-x-auto rounded-xl">
        <table className="w-full text-lg text-left text-gray-700 ">
          <thead className="text-xl text-black uppercase bg-gray-200 ">
            <tr>
              <th scope="col" class="px-2">
                Profesor
              </th>
              <th scope="col" class="px-2 py-3">
                Asignatura
              </th>
              <th scope="col" class="px-2 py-3">
                Seccion
              </th>
              <th scope="col" class="px-2 py-3">
                Estudiante
              </th>
              <th scope="col" class="px-2 py-3">
                Deficiente
              </th>
              <th scope="col" class="px-2 py-3">
                Bueno
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                Muy bueno
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                Excelente
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                Respuesta 26
              </th>{" "}
              <th scope="col" class="px-2 py-3">
              Respuesta 27
              </th>{" "}
              <th scope="col" class="px-2 py-3">
              Respuesta 28
              </th>{" "}
            </tr>
          </thead>
          <tbody>
            {dataEvaluacion && (
              <>
                {dataEvaluacion.map((evalau) => (
                  <>
                    <tr className="bg-white border-b hover:bg-gray-100">
                      <td className="px-6 py-4">
                        {evalau.professorName}
                      </td>
                      <td className="px-6 py-4">
                        {evalau.COURSE_NAME}
                      </td>
                      <td className="px-6 py-4">
                        {evalau.SECTION_CODE}
                      </td>
                      <td className="px-6 py-4">
                        {evalau.STUDENT_NAME}
                      </td>
                      <td className="px-6 py-4">
                        {evalau.sumDeficiente}/25
                      </td>
                      <td className="px-6 py-4">
                        {evalau.sumBueno}/25
                      </td>
                      <td className="px-6 py-4">
                        {evalau.sumMuyBueno}/25
                      </td>
                      <td className="px-6 py-4">
                        {evalau.sumExcelente}/25
                      </td>
                      <td className="px-6 py-4">
                        {evalau.RESP_26}
                      </td>
                      <td className="px-6 py-4">
                        {evalau.RESP_27}
                      </td>
                      <td className="px-6 py-4">
                        {evalau.RESP_28}
                      </td>
                    </tr>
                  </>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Evaluaciones;
