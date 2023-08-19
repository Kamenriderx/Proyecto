import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../store/ContextExample";
import Modal from "../../components/Modal";
import { AiFillEye } from "react-icons/ai";

const ListadoAlumnosClass = () => {
  const { periodo, state } = useContext(StoreContext);
  const [listAlumnos, setListAlumnos] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  console.log("ESTADO GLOBAL", periodo);

  console.log("LISTADO DE ALUMNOS PARA COORDI", listAlumnos);
  return (
    <div className="flex mt-10">
      <div className="container mx-auto mt-10">
        <Modal Visible={showModal} Close={() => setShowModal(false)}>
          <p>MODALLLLLL</p>
        </Modal>
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
                <th className="p-2">Obs</th>
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
                  <td className="text-center border px-4 py-2 text-sm font-medium r">
                    <div className="flex justify-center">
                      <AiFillEye
                        size={25}
                        className="cursor-pointer"
                        onClick={() => setShowModal(true)}
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
