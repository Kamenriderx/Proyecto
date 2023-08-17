import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal2 from "../../../components/Modal2";
import { AiFillEye } from "react-icons/ai";
import AlertTwo from "../../../components/AlertTwo";
const SectionDetails = () => {
  const params = useParams();
  const id = params.idSection;
  const [sectionDetails, setSectionDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [matriculados, setMatriculados] = useState([]);
  const [listaEspera, setListaEspera] = useState([]);
  const [check, setCheck] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [check2, setCheck2] = useState(false);

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
  }, [id, check2]);

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

  const getIdListaEspera = async (id) => {
    try {
      const response = await axios(
        `http://localhost:3000/registro/section/studentsWaiting/${id}`
      );
      setListaEspera(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/registro/section/updateState/${id}`
      );

      console.log("RESPUESTA UPDATE", response);
      setAlerta({
        message: response.data.message,
        error: false,
      });
      setCheck(!check);
      setCheck2(!check2);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIdListaEspera();
  }, [check]);

  const handleClick = (id) => {
    setShowModal2(true);
    getIdMatriculados(id);
  };

  const handleClick2 = (id) => {
    setShowModal(true);
    getIdListaEspera(id);
  };

  const { message } = alerta;

  if (!sectionDetails) {
    return <p>Cargando detalles...</p>;
  }

  return (
    <div className="flex mt-24">
      {message && <AlertTwo alerta={alerta} />}
      <Modal2 Visible={showModal} Close={() => setShowModal(false)}>
        <div className="mt-5 text-center">
          <p className="text-gray-800 font-bold text-lg">
            ALUMNOS EN LISTA DE ESPERA
          </p>
        </div>
        <div>
          <div className="mt-5 mx-5 my-5">
            <>
              {listaEspera.length > 0 ? (
                <table className="w-full bg-white shadow-md table-auto">
                  <thead className="bg-blue-800 text-white">
                    <tr>
                      <th className="p-2">Nombre del Alumno</th>
                      <th className="p-2">Numero de Cuenta</th>
                      <th className="p-2">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaEspera.map((lista) => (
                      <tr className="border-b" key={lista.ACCOUNT_NUMBER}>
                        <td className="py-2 px-3 text-gray-800 font-bold">
                          {lista.STUDENT_NAME}
                        </td>
                        <td className="py-2 px-3 text-gray-700 font-bold">
                          {lista.ACCOUNT_NUMBER}
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex justify-center">
                            <button
                              onClick={() =>
                                handleClickUpdate(lista.ID_STUDENT)
                              }
                              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-base py-2 px-3 shadow rounded-md"
                            >
                              Matricular
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center">
                  <p className="uppercase font-black text-gray-800 text-2xl">
                    No hay alumnos en lista de espera en esta seccion
                  </p>
                </div>
              )}
            </>
          </div>
        </div>
      </Modal2>
      <Modal2 Visible={showModal2} Close={() => setShowModal2(false)}>
        <div className="mt-5 text-center">
          <p className="text-gray-800 font-bold text-lg">
            ALUMNOS MATRICULADOS
          </p>
        </div>
        <div>
          <div className="mt-5 mx-5 my-5">
            <>
              {matriculados.length > 0 ? (
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
                    {matriculados.map((matriculado) => (
                      <tr className="border-b" key={matriculado.ID_STUDENT}>
                        <td className="py-2 px-3 text-gray-700 font-bold">
                          {matriculado.STUDENT_NAME}
                        </td>
                        <td className="py-2 px-3 text-sky-800 font-bold text-center">
                          {matriculado.ACCOUNT_NUMBER}
                        </td>
                        <td className="py-2 px-3 text-gray-700 font-bold text-center">
                          {matriculado.CALIFICATION}
                        </td>
                        <td className="py-2 px-3  text-sky-800 font-bold text-center">
                          {matriculado.OBS}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center">
                  <p className="uppercase font-black text-gray-800 text-2xl">
                    No hay alumnos matriculados en esta seccion
                  </p>
                </div>
              )}
            </>
          </div>
        </div>
      </Modal2>
      <div className="container mx-auto">
        <div className="mt-10 text-center">
          <p className="text-sky-800 font-black uppercase text-2xl">
            Detalles de la Sección
          </p>
        </div>
        <div className="flex mt-10">
          <table className="table-auto w-3/4 bg-white shadow-md rounded-lg mx-auto">
            <tbody>
              <tr className="bg-gray-100">
                <td className="border w-2/4 px-4 py-4 text-gray-700 font-bold text-lg">
                  Nombre de la Clase
                </td>
                <td className="border px-4 py-4 text-sky-900 font-bold text-lg">
                  {sectionDetails.courseName}
                </td>
              </tr>
              <tr className="bg-blue-100">
                <td className="border px-4 py-4 text-gray-700 font-bold text-lg">
                  Seccion
                </td>
                <td className="border px-4 py-4 text-sky-900 font-bold text-lg">
                  {sectionDetails.sectionNumber}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-4 text-gray-700 font-bold text-lg">
                  Alumnos Matriculados
                </td>
                <td className="border px-4 py-4 text-sky-900 font-bold text-lg">
                  <div className="flex justify-between items-center">
                    <div>{sectionDetails.totalEnrolled}</div>
                    <div>
                      <AiFillEye
                        onClick={() => handleClick(sectionDetails.ID_SECTION)}
                        className="cursor-pointer"
                        size={25}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="bg-sky-100">
                <td className="border px-4 py-4 text-gray-700 font-bold text-lg">
                  Alumnos en Lista de Espera
                </td>
                <td className="border px-4 py-4 text-sky-900 font-bold text-lg">
                  <div className="flex justify-between items-center">
                    <div> {sectionDetails.totalWaitlist}</div>
                    <div>
                      <AiFillEye
                        onClick={() => handleClick2(sectionDetails.ID_SECTION)}
                        className="cursor-pointer"
                        size={25}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-4 text-gray-700 font-bold text-lg">
                  Nombre del Docente
                </td>
                <td className="border px-4 py-4 text-sky-900 font-bold text-lg">
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
