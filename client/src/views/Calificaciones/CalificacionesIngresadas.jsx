import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/ContextExample";
import StudentContext from "../ViewStudent/context/StudentContext";
import { httpRequests } from "../../utils/helpers/httpRequests";

const CalificacionesIngresadas = () => {
  //contexto de usuario
  const { state } = useContext(StoreContext);
  //contexto de estudiante
  const { stateStudent, getStudent } = useContext(StudentContext);

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

  useEffect(() => {
    getStudent(state);
    getSeccion();
  }, [state]);

  return (
    <div className="mx-16 mt-32 ">
      <p className="text-2xl font-bold text-center mb-4 uppercase">
        Calificaciones ingresadas
      </p>
      <div className="relative overflow-x-auto rounded-xl shadow-xl shadow-blue-200">
        <table className="w-full text-lg text-left text-gray-700 ">
          <thead className="text-xl text-black uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                CÓDIGO
              </th>
              <th scope="col" className="px-6 py-3">
                ASIGNATURA
              </th>
              <th scope="col" className="px-6 py-3">
                DOCENTE
              </th>
              <th scope="col" className="px-6 py-3">
                CALIFICACIÓN
              </th>
              <th scope="col" className="px-6 py-3">
                OBSERVACIÓN
              </th>
            </tr>
          </thead>
          <tbody>
            {secciones && (
              <>
                {secciones.map((seccion) => (
                  <>
                    <tr>
                      <td className="px-6 py-4">
                        {seccion.CODE_COURSE}
                      </td>
                      <td className="px-6 py-4">{seccion.COURSE_NAME}</td>
                      <td className="px-6 py-4">
                        {seccion.NAME_PROFFESOR}
                      </td>
                      <td className="px-6 py-4">{seccion.CALIFICATION}</td>
                      <td className="px-6 py-4">
                        {seccion.OBSERVATION}
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
export default CalificacionesIngresadas;
