import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../store/ContextExample";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import Modal2 from "../../components/Modal2";
const ClassTeacher = () => {
  const { state, dispatch, periodo } = useContext(StoreContext);
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [matriculados, setMatriculados] = useState([]);
  const [selectedClassName, setSelectedClassName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const getClassTeacher = async () => {
      try {
        const response = await axios(
          `http://localhost:3000/registro/section/sectionsForProfessors/${state.user.ID_USER}/${periodo.ID_PERIOD}`
        );
        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClassTeacher();
  }, [state.user.ID_USER]);

  console.log("clases", classes);

  const handleClick = async (id, className, code) => {
    setShowModal(true);
    setSelectedClassName(className);
    setCode(code);
    await getIdMatriculados(id);
  };

  const getIdMatriculados = async (id) => {
    try {
      const response = await axios(
        `http://localhost:3000/registro/section/studentsEnrolled/${id}`
      );
      setMatriculados(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "NombreEstudiante,NumeroCuenta\n" +
      matriculados
        .map((matri) => `${matri.STUDENT_NAME},${matri.ACCOUNT_NUMBER}\n`)
        .join("");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "matriculados.csv");
    document.body.appendChild(link);
    link.click();
  };

  console.log("LOS MATRICULADOS", matriculados);

  return (
    <div className="container mx-auto">
      <Modal2 Visible={showModal} Close={() => setShowModal(false)}>
        <div className="mt-5 mx-3">
          <div className="text-center">
            <p className="text-sky-800 text-xl font-bold">
              Estudiantes matriculados en{" "}
              <span className="text-gray-800 font-black text-base">
                {selectedClassName} - {code}
              </span>
            </p>
          </div>
          <div className="mt-5">
            {matriculados.length > 0 ? (
              <>
                <table className="w-full bg-white shadow-md table-auto">
                  <thead className="bg-blue-800 text-white">
                    <tr>
                      <th className="p-2">Nombre</th>
                      <th className="p-2">Numero de cuenta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matriculados.map((mat) => (
                      <tr className="border-b" key={mat.ID_STUDENT}>
                        <td className="border px-4 py-2 text-sm font-medium r">
                          {mat.STUDENT_NAME}
                        </td>
                        <td className="text-center border px-4 py-2 text-sm font-medium r">
                          {mat.ACCOUNT_NUMBER}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="mt-5 text-center">
                <p className="text-xl font-black text-gray-800">
                  No se encontraron alumnos matriculados
                </p>
              </div>
            )}
          </div>
          <div className="mt-5 flex justify-end mb-2">
            <button
              onClick={downloadCSV}
              className="bg-green-600 hover:bg-green-700 text-white font-bold shadow rounded cursor-pointer text-base py-2 px-3"
            >
              Descargar Lista
            </button>
          </div>
        </div>
      </Modal2>
      <div className="flex justify-center">
        <div className="mt-10">
          <p className="text-gray-800 text-3xl font-black">Clases Asignadas</p>
        </div>
      </div>
      <div className="mt-5">
        <div className="mt-10">
          {classes?.length > 0 ? (
            <>
              <table className="w-full bg-white shadow-md table-auto">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="p-2">Clase</th>
                    <th className="p-2">Seccion</th>
                    <th className="p-2">Codigo</th>
                    <th className="p-2">Dias</th>
                    <th className="p-2">HI</th>
                    <th className="p-2">HF</th>
                    <th className="p-2">Ver alumnos</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((clase) => (
                    <tr className="border-b" key={clase.ID_SECTION}>
                      <td className="border px-4 py-2 text-sm font-medium r">
                        {clase.NAME}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {clase.SECTION_CODE}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {clase.CODE_COURSE}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {clase.DAYS}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {clase.START_TIME}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {clase.END_TIME}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        <div className="flex justify-center">
                          <AiFillEye
                            size={25}
                            className="cursor-pointer"
                            onClick={() =>
                              handleClick(
                                clase.ID_SECTION,
                                clase.NAME,
                                clase.SECTION_CODE
                              )
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-2xl text-center uppercase font-bold ">
              No se encontraron clases asignadas
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassTeacher;
