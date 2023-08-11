import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal2 from "../../../components/Modal2";
import Modal from "../../../components/Modal";
const SectionDetails = () => {
  const params = useParams();
  const id = params.idSection;
  const [sectionDetails, setSectionDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:3000/registro/section/sections/${id}`,
          config
        );
        setSectionDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSectionDetails();
  }, [id]);

  console.log("ID", params);
  console.log("IDDDDD", id);

  console.log("DETALLES DE SECCION", sectionDetails);

  if (!sectionDetails) {
    return <p>Cargando detalles...</p>;
  }

  return (
    <div className="flex mt-24">
      <Modal2 Visible={showModal} Close={() => setShowModal(false)}>
        <div className="mt-5 text-center">
          <p className="text-gray-800 font-bold text-lg">
            ALUMNOS EN LISTA DE ESPERA
          </p>
        </div>
        <div>
          <div className="mt-5 mx-5 my-5">
            <>
              <table className="w-full bg-white shadow-md table-auto">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="p-2">Nombre del Alumno</th>
                    <th className="p-2">Numero de Cuenta</th>
                    <th className="p-2">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3">Carlos Alcerro</td>
                    <td className="py-2 px-3">20181900319</td>
                    <td className="py-2 px-3">
                      <div className="flex justify-center">
                        <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-base py-2 px-3 shadow rounded-md">
                          Matricular
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          </div>
        </div>
      </Modal2>
      <Modal Visible={showModal2} Close={() => setShowModal2(false)}>
        <div className="mt-5 text-center">
          <p className="text-gray-800 font-bold text-lg">
            ALUMNOS MATRICULADOS
          </p>
        </div>
        <div>
          <div className="mt-5 mx-5 my-5">
            <>
              <table className="w-full bg-white shadow-md table-auto">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="p-2">Nombre del Alumno</th>
                    <th className="p-2">Numero de Cuenta</th>
                    <th className="p-2">Calificacion</th>
                    <th className="p-2">Obs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3">Carlos Alcerro</td>
                    <td className="py-2 px-3">20181900319</td>
                    <td className="py-2 px-3">87</td>
                    <td className="py-2 px-3">APR</td>
                  </tr>
                </tbody>
              </table>
            </>
          </div>
        </div>
      </Modal>
      <div className="container mx-auto">
        <div className="mt-10 text-center">
          <p className="text-gray-800 font-bold uppercase text-xl">
            Detalles de la Sección{" "}
            <span className="text-sky-700 font-bold text-xl">
              {sectionDetails.courseName}
            </span>
          </p>
        </div>
        <div className="flex mt-10">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <tbody>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2 text-gray-700 font-bold text-lg">
                  Nombre de Clase
                </td>
                <td className="border px-4 py-2 text-sky-900 font-bold text-lg">
                  {sectionDetails.courseName}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2 text-gray-700 font-bold text-lg">
                  Seccion
                </td>
                <td className="border px-4 py-2 text-sky-900 font-bold text-lg">
                  {sectionDetails.sectionNumber}
                </td>
              </tr>
              <tr
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => setShowModal2(true)}
              >
                <td className="border px-4 py-2 text-gray-700 font-bold text-lg">
                  Alumnos Matriculados
                </td>
                <td className="border px-4 py-2 text-sky-900 font-bold text-lg">
                  {sectionDetails.totalEnrolled}
                </td>
              </tr>
              <tr
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <td className="border px-4 py-2 text-gray-700 font-bold text-lg">
                  Alumnos en Lista de Espera
                </td>
                <td className="border px-4 py-2 text-sky-900 font-bold text-lg">
                  {sectionDetails.totalWaitlist}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2 text-gray-700 font-bold text-lg">
                  Nombre del Docente
                </td>
                <td className="border px-4 py-2 text-sky-900 font-bold text-lg">
                  {sectionDetails.professorName}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SectionDetails;
