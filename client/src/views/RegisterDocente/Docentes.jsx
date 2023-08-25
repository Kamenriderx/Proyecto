import { useEffect, useState } from "react";
import FormularioDocente from "./components/FormularioDocente";
/* import PreviewDocente from '../../components/Docente/PreviewDocente' */
import Modal from "../../components/Modal";
import useAxios from "../../utils/hooks/useAxios";
import PreviewDocente from "./components/PreviewDocente";
import axios from "axios";

const Docentes = () => {
  const [showModal, setShowModal] = useState(false);
  const [docentes, setDocentes] = useState([]);
  const [check, setCheck] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(10);

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = docentes.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const totalPages = Math.ceil(docentes.length / teachersPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const axiosCall = async () => {
      const res = await axios(
        "http://localhost:3000/registro/admin/getProfessors"
      );
      setDocentes(res.data.professors);
    };
    axiosCall();
  }, [check]);
  return (
    <>
      <div className="md:flex md:justify-center gap-40 h-auto mt-5">
        <button
          className="bg-sky-600 hover:bg-sky-900 text-center text-white shadow p-2 border transition-colors uppercase font-bold text-lg rounded-md"
          onClick={() => setShowModal(true)}
        >
          Registrar Docente
        </button>
        <Modal Visible={showModal} Close={() => setShowModal(false)}>
          <div className="p-4">
            <FormularioDocente setCheck={setCheck} check={check} />
          </div>
        </Modal>
        <h1 className="text-4xl font-black text-center">Docentes</h1>
      </div>
      <div className="shadow rounded-md p-5 mt-10">
        {docentes?.length > 0 ? (
          <>
            <table className="w-full bg-white shadow-md table-auto">
              <thead className="bg-blue-800 text-white">
                <tr className="">
                  <th className="p-2">Nombre del Docente</th>
                  <th className="p-2">Carrera</th>
                  <th className="p-2">Centro</th>
                  <th className="p-2">Numero de Cuenta</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Rol del Docente</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentTeachers.map((docente, index) => (
                  <PreviewDocente docente={docente} key={index} />
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
          <p className="text-2xl text-center uppercase font-bold ">
            No hay Docentes Inscritos Aun
          </p>
        )}
      </div>
    </>
  );
};

export default Docentes;
