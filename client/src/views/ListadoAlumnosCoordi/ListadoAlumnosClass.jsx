import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../store/ContextExample";
import Modal3 from "../../components/Modal";
import { AiFillEye } from "react-icons/ai";

const ListadoAlumnosClass = () => {
  const { periodo, state } = useContext(StoreContext);
  const [listAlumnos, setListAlumnos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [matriculadas, setMatriculadas] = useState([]);

  useEffect(() => {
    const getListAlumnos = async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (!token) return;
      try {
        const response = await axios(
          `http://localhost:3000/registro/student/getStudentsEnrollmentPeriod/${periodo.ID_PERIOD}/${state.user.ID_USER}`,
          config
        );
        setListAlumnos(response.data.enrrolmentStudents);
      } catch (error) {
        console.log(error);
      }
    };
    getListAlumnos();
  }, []);

  const getMatriculadosCoordi = async (ID_STUDENT) => {
    try {
      const response = await axios(
        `http://localhost:3000/registro/student/getEnrollmentsStudent/${ID_STUDENT}`
      );
      setMatriculadas(response.data.coursesEnrollments);
      console.log("MATRICULADAS", response.data.coursesEnrollments);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("CLASES MATRICULADAS POR ESTUDIANTE", matriculadas);

  const cancelarAsignatura = async (ID_ENROLLMENT, ID_STUDENT) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/registro/enrollment/canceledInscriptionSpecial/${ID_ENROLLMENT}/${ID_STUDENT}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    setShowModal(true);
    getMatriculadosCoordi(id);
  };

  return (
    <div className="flex mt-10">
      <div className="container mx-auto mt-10">
        <Modal3 Visible={showModal} Close={() => setShowModal(false)}>
          <div className="my-2 mx-2 shadow rounded bg-gray-100">
            <div className="mx-3">
              <div className="mt-4 text-center">
                <p className="text-gray-700 font-bold text-lg mb-5">
                  Clases Matriculadas por el Alumno{" "}
                </p>
              </div>
              <div>
                <div className="flex">
                  {matriculadas.length > 0 ? (
                    <table className="w-full bg-white shadow-md table-auto">
                      <thead className="bg-blue-800 text-white">
                        <tr className="">
                          <th className="p-2">Codigo</th>
                          <th className="p-2">Clase</th>
                          <th className="p-2">Seccion</th>
                          <th className="p-2">UV</th>
                          <th className="p-2">Dias</th>
                          <th className="p-2">Cancelar Asignatura</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matriculadas.map((mat) => (
                          <tr className="border-b" key={mat.ID_ENROLLMENT}>
                            <td className="border px-4 py-2 text-md font-bold r">
                              {mat.seccion.course.CODE_COURSE}
                            </td>
                            <td className="border px-4 py-2 text-md font-bold r">
                              {mat.seccion.course.NAME}
                            </td>
                            <td className="border px-4 py-2 text-md font-bold r">
                              {mat.seccion.SECTION_CODE}
                            </td>
                            <td className="border px-4 py-2 text-md font-bold r">
                              {mat.seccion.course.UV}
                            </td>
                            <td className="border px-4 py-2 text-md font-bold r">
                              {mat.seccion.DAYS}
                            </td>
                            <td className="text-center border px-4 py-2 text-sm font-medium r">
                              <div className="flex justify-center">
                                <button
                                  onClick={() => cancelarAsignatura()}
                                  className="py-2 px-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow"
                                >
                                  Cancelar Asignatura
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center">
                      <p className="text-black font-bold text-2xl">
                        Sin Alumnos Matriculados
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal3>
        {/* {message && <AlertTwo alerta={alerta} />} */}
        <div className="text-center mb-10">
          <p className="text-red-800 text-2xl font-bold">
            Listado de Alumnos Matriculados en el{" "}
            <span className="text-sky-800 font-black">
              {periodo.PERIOD_NAME}
            </span>
          </p>
        </div>
        {listAlumnos.length > 0 ? (
          <table className="w-full bg-white shadow-md table-auto">
            <thead className="bg-blue-800 text-white">
              <tr className="">
                <th className="p-2">Carrera</th>
                <th className="p-2">Correo Institucional</th>
                <th className="p-2">Cuenta</th>
                <th className="p-2">Ver Clases Matriculadas</th>
              </tr>
            </thead>
            <tbody>
              {listAlumnos.map((solicitudes) => (
                <tr className="border-b" key={solicitudes.ID_STUDENT}>
                  <td className="border px-4 py-2 text-md font-bold r">
                    {solicitudes.CAREER}
                  </td>
                  <td className="border px-4 py-2 text-md font-bold r">
                    {solicitudes.INSTITUTIONAL_EMAIL}
                  </td>
                  <td className="border px-4 py-2 text-md font-bold r">
                    {solicitudes.user.ACCOUNT_NUMBER}
                  </td>
                  <td className="text-center border px-4 py-2 text-sm font-medium r">
                    <div className="flex justify-center">
                      <AiFillEye
                        size={25}
                        className="cursor-pointer"
                        onClick={() => handleClick(solicitudes.ID_STUDENT)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <p className="text-black font-bold text-2xl">
              Sin Alumnos Matriculados
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListadoAlumnosClass;
