import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../../store/ContextExample";
import { useParams } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import Modal3 from "../../../components/Modal3";

export const NavigateSections = () => {
  const params = useParams();
  console.log("PARAMS", params);
  const { state, periodo } = useContext(StoreContext);
  const [sections, setSections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [calificaciones, setCalificaciones] = useState([]);
  const [NombreClase, setNombreClase] = useState("");

  useEffect(() => {
    const getSecciones = async () => {
      try {
        const response = await axios(
          `http://localhost:3000/registro/headOfDepartment/getSectionsProfessor/${params.id}/${periodo.ID_PERIOD}`
        );
        setSections(response.data.sections);
        console.log("SECCIONES", response.data.sections);
      } catch (error) {
        console.log(error);
      }
    };
    getSecciones();
  }, [params.id, periodo.ID_PERIOD]);

  const getCalificaciones = async (id) => {
    try {
      const response = await axios(
        `http://localhost:3000/registro/headOfDepartment/getNotesSectionsProfessor/${periodo.ID_PERIOD}/${id}`
      );
      setCalificaciones(response.data.section);
      console.log("CALIFICACIONES", response.data.section);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("SECCIONES VARIABLE", sections);

  const handleClick = (id, Nombre) => {
    setShowModal(true);
    getCalificaciones(id);
    setNombreClase(Nombre);
  };
  console.log("CALIFICACIONES VAR", calificaciones);
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <Modal3 Visible={showModal} Close={() => setShowModal(false)}>
          <div className="mt-5">
            <div className="text-center">
              <p className="text-lg text-sky-700 font-black">
                Calificaciones de estudiantes
              </p>
              <div className="mt-5">
                <p className="text-sm text-gray-700 font-black">
                  {NombreClase}
                </p>
              </div>
            </div>
            <div className="mt-10 mb-5">
              {calificaciones?.length > 0 ? (
                <>
                  <table className="w-full bg-white shadow-md table-auto">
                    <thead className="bg-blue-800 text-white">
                      <tr>
                        <th className="p-2">Carrera</th>
                        <th className="p-2">Correo Estudiante</th>
                        <th className="p-2">Numero de Cuenta</th>
                        <th className="p-2">Calificacion</th>
                        <th className="p-2">OBS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calificaciones.map((cal) => (
                        <tr className="border-b" key={cal.ID_ENROLLMENT}>
                          <td className="border px-4 py-2 text-sm font-medium r">
                            {cal.student.CAREER}
                          </td>
                          <td className="text-center border px-4 py-2 text-sm font-medium r">
                            {cal.student.INSTITUTIONAL_EMAIL}
                          </td>
                          <td className="text-center border px-4 py-2 text-sm font-medium r">
                            {cal.student.user.ACCOUNT_NUMBER}
                          </td>
                          <td className="text-center border px-4 py-2 text-sm font-medium r">
                            {cal.CALIFICATION}
                          </td>
                          <td className="text-center border px-4 py-2 text-sm font-medium r">
                            {cal.OBS}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <p className="text-2xl text-center uppercase font-bold ">
                  No se encontraron Secciones asignadas
                </p>
              )}
            </div>
          </div>
        </Modal3>
        <div className="mt-10">
          <p className="text-gray-800 text-3xl font-black">
            Secciones impartidas por el Maestro
          </p>
        </div>
      </div>
      <div className="mt-5">
        <div className="mt-10">
          {sections?.length > 0 ? (
            <>
              <table className="w-full bg-white shadow-md table-auto">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="p-2">Codigo Clase</th>
                    <th className="p-2">Nombre Clase</th>
                    <th className="p-2">Seccion</th>
                    <th className="p-2">Dias</th>
                    <th className="p-2">Edificio</th>
                    <th className="p-2">Periodo</th>
                    <th className="p-2">Ver Calificaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((sect) => (
                    <tr className="border-b" key={sect.ID_SECTION}>
                      <td className="border px-4 py-2 text-sm font-medium r">
                        {sect.course.CODE_COURSE}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {sect.course.NAME}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {sect.SECTION_CODE}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {sect.DAYS}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {sect.classroom.building.NAME}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {sect.period.PERIOD_NAME}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        <div className="flex justify-center items-center">
                          <p>
                            <GrFormView
                              className="cursor-pointer"
                              size={30}
                              onClick={() =>
                                handleClick(sect.ID_SECTION, sect.course.NAME)
                              }
                            />
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-2xl text-center uppercase font-bold ">
              No se encontraron Secciones asignadas
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
