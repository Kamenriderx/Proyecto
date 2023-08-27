import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../store/ContextExample";
import { BiSearch } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { BiArrowBack } from "react-icons/Bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListTeachers = () => {
  const [docentes, setDocentes] = useState([]);
  const [docentesFiltrados, setDocentesFiltrados] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const { state, dispatch } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchDocentes = async () => {
      setLoading(true);
      try {
        const response = await axios(
          `http://localhost:3000/registro/professor/professorsCareer/${state.user.ID_USER}`
        );
        setLoading(false);
        setDocentes(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de docentes", error);
      }
    };

    fetchDocentes();
  }, []);

  const handleChangeCarrera = (event) => {
    setValueSearch(event.target.value);
  };

  const handleBuscar = () => {
    if (valueSearch === "") {
      navigate("/perfil");
    }
    const filtrados = docentes.filter(
      (docente) =>
        (docente.CAREER.toLowerCase().includes(valueSearch.toLowerCase()) &&
          docente.ID_USER !== state.user.ID_USER &&
          state.user.CENTER === docente.CENTER) ||
        (docente.ACCOUNT_NUMBER.toString().includes(
          valueSearch.toLowerCase()
        ) &&
          state.user.CENTER === docente.CENTER)
    );
    setDocentesFiltrados(filtrados);
  };

  const handleApproval = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/registro/passResetApproval/aprove/${id}/${state.user.ID_USER}`
      );

      toast.success("Solicitud de activacion exitosa", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-start">
        <div className="">
          <button
            onClick={handleBack}
            className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
          >
            <BiArrowBack color="#F7F9F7" size={20} />
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-700 mt-10">
        Búsqueda de docentes por carrera
      </h2>
      <div className="flex items-center justify-center mb-6">
        <ToastContainer position="top-right" />
        <input
          type="text"
          value={valueSearch}
          onChange={handleChangeCarrera}
          className="border border-gray-300 px-2 py-2 rounded w-2/4 hover:border-blue-400"
          placeholder="Ingrese el nombre"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-500 hover:bg-blue-600 text-white font-black text-2xl px-5 py-2 rounded ml-2 shadow"
        >
          <BiSearch className="mr-2" />
        </button>
      </div>
      <div className="mt-6">
        {docentesFiltrados?.length > 0 ? (
          <>
            <table className="w-full bg-white shadow-md table-auto">
              <thead className="bg-blue-800 text-white">
                <tr className="">
                  <th className="p-2">Foto de Perfil</th>
                  <th className="p-2">Nombre del Docente</th>
                  <th className="p-2">Correo Institucional</th>
                  <th className="p-2">Carrera</th>
                  <th className="p-2">Centro</th>
                  <th className="p-2">Activar Cambio</th>
                </tr>
              </thead>
              <tbody>
                {docentesFiltrados.map((docente) => (
                  <tr className="border-b" key={docente.ID_USER}>
                    <td className="border px-4 py-2 text-lg font-bold r">
                      <div className="bg-gray-300 w-20 h-20 mx-auto rounded-full mb-2">
                        <img
                          src={docente.PROFILE_PHOTO}
                          alt="Foto Perfil"
                          className="w-20 h-20 mx-auto rounded-full"
                        />
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-lg font-bold r">
                      {docente.NAME}
                    </td>
                    <td className="border px-4 py-2 text-lg font-bold r">
                      {docente.INSTITUTIONAL_EMAIL}
                    </td>
                    <td className="border px-4 py-2 text-lg font-bold r">
                      {docente.CAREER}
                    </td>
                    <td className="text-center border px-4 py-2 text-lg font-bold r">
                      {docente.CENTER}
                    </td>
                    <td className="border px-4 py-2 text-lg font-bold r">
                      <div className="flex justify-center">
                        <button
                          className=" bg-sky-600 hover:bg-sky-700 cursor-pointer shadow py-2 px-3 rounded-md text-white font-bold text-lg"
                          onClick={() => handleApproval(docente.ID_USER)}
                        >
                          Activar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-center text-xl text-black font-black text-cente">
            No hay docentes en la busqueda.
          </p>
        )}
      </div>
    </div>
  );
};

export default ListTeachers;
