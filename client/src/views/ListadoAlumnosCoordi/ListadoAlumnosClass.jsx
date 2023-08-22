import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../store/ContextExample";
import Modal3 from "../../components/Modal3";
import { AiFillEye } from "react-icons/ai";
import AlertTwo from "../../components/AlertTwo";

const ListadoAlumnosClass = () => {
  const { periodo, state } = useContext(StoreContext);
  const [listAlumnos, setListAlumnos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [matriculadas, setMatriculadas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [check2, setCheck2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [AlumnosPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const indexOfLastTeacher = currentPage * AlumnosPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - AlumnosPerPage;
  const currentAlumnos = listAlumnos.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const totalPages = Math.ceil(listAlumnos.length / AlumnosPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filtra los alumnos que coincidan con la cadena de búsqueda
    const filteredAlumnos = listAlumnos.filter((alumno) =>
      alumno.user.ACCOUNT_NUMBER.includes(value)
    );

    setSearchResults(filteredAlumnos);
  };

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
  }, [check2]);

  const getMatriculadosCoordi = async (ID_STUDENT) => {
    try {
      const response = await axios(
        `http://localhost:3000/registro/student/getEnrollmentsStudent/${ID_STUDENT}/${state.user.ID_USER}`
      );
      setMatriculadas(response.data.coursesEnrollments);
      console.log("MATRICULADAS", response.data.coursesEnrollments);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("CLASES MATRICULADAS POR ESTUDIANTE", matriculadas);

  /*   const cancelarAsignatura = async (ID_ENROLLMENT, ID_STUDENT) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/registro/enrollment/canceledInscriptionSpecial/${ID_ENROLLMENT}/${ID_STUDENT}`
      );
      console.log(response);
      setMatriculadas((prevMatriculadas) => {
        const updatedMatriculadas = prevMatriculadas.filter(
          (mat) => mat.ID_ENROLLMENT !== ID_ENROLLMENT
        );
        return updatedMatriculadas;
      });
      setAlerta({
        message: "Clase Cancelada Exitosamente",
        error: false,
      });
      setCheck2(!check2);
    } catch (error) {
      console.log(error);
    }
  }; */

  const handleClick = (id) => {
    setShowModal(true);
    getMatriculadosCoordi(id);
  };

  console.log("PERIODO", periodo);

  const { message } = alerta;

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
                            {/*  <td className="text-center border px-4 py-2 text-sm font-medium r">
                              <div className="flex justify-center">
                                <button
                                  onClick={() =>
                                    cancelarAsignatura(
                                      mat.ID_ENROLLMENT,
                                      mat.ID_STUDENT
                                    )
                                  }
                                  className="py-2 px-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow"
                                >
                                  Cancelar Asignatura
                                </button>
                              </div>
                            </td> */}
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
        {message && <AlertTwo alerta={alerta} />}
        <div className="text-center mb-10">
          <p className="text-red-800 text-2xl font-bold">
            Listado de Alumnos Matriculados en el{" "}
            <span className="text-sky-800 font-black">
              {periodo.PERIOD_NAME}
            </span>
          </p>
          <div className="mt-10 w-full flex justify-center">
            <div className="w-3/6">
              <input
                type="text"
                placeholder="Buscar por número de cuenta"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full border rounded-full text-center"
              />
            </div>
          </div>
        </div>
        {searchTerm ? (
          <>
            <p className="text-xl font-bold mb-5">Resultados de la búsqueda:</p>
            {searchResults.length > 0 ? (
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
                  {searchResults.map((solicitudes) => (
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
              <p className="text-red-800 text-2xl font-black">
                No se encontraron resultados en la busqueda
              </p>
            )}
          </>
        ) : (
          <>
            {listAlumnos.length > 0 ? (
              <>
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
                    {currentAlumnos.map((solicitudes) => (
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
                              onClick={() =>
                                handleClick(solicitudes.ID_STUDENT)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col">
                  {/* ... */}
                  <div className="flex justify-center mt-4">
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`mx-1 px-2 py-1 rounded ${
                          currentPage === number
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-black font-bold text-2xl">
                  Sin Alumnos Matriculados
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListadoAlumnosClass;
