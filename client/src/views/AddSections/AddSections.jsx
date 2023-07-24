import { AiOutlineAppstoreAdd, AiFillDelete, AiFillEdit } from "react-icons/ai";
import Modal from "../../components/Modal";
import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../store/ContextExample";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSections = () => {
  const [showModal, setShowModal] = useState(false);
  const { state, dispatch } = useContext(StoreContext);
  const [listCourses, setListCourses] = useState([]);
  const [listAulas, setListAulas] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [START_TIME, setSTART_TIME] = useState("");
  const [END_TIME, setEND_TIME] = useState("");
  const [DAYS, setDAYS] = useState("");
  const [ID_COURSE, setID_COURSE] = useState("");
  const [ID_PROFFERSSOR, setID_PROFFERSSOR] = useState("");
  const [ID_CLASSROOM, setID_CLASSROOM] = useState("");
  const [SPACE_AVAILABLE, setSPACE_AVAILABLE] = useState("");
  const [DAYS_COUNT, setDAYS_COUNT] = useState("");
  const [sections, setSections] = useState([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios(
          `http://localhost:3000/registro/section/getProfessorsByCenterCareer`,
          config
        );
        setDocentes(response.data.professors);
        console.log("Docentes Por Carrera", response.data.professors);
      } catch (error) {
        console.log("Error al obtener la lista de docentes", error);
      }
    };

    fetchDocentes();
  }, []);

  console.log("Todos los docentes de Sistemas :", docentes);
  console.log("Estado de Sesion", state);

  useEffect(() => {
    const getListClass = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios(
          `http://localhost:3000/registro/course/listCourses/${state.user.ID_USER}`,
          config
        );
        console.log(response.data.courses);
        setListCourses(response.data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    getListClass();
  }, []);

  useEffect(() => {
    const getListAula = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios(
          `http://localhost:3000/registro/classroom/listClassrooms/${state.user.ID_USER}`,
          config
        );
        console.log(response.data.classrooms);
        setListAulas(response.data.classrooms);
      } catch (error) {
        console.log(error);
      }
    };
    getListAula();
  }, []);

  console.log("Lista de Cursos", listCourses);
  console.log("Listado de Aulas", listAulas);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        DAYS,
        START_TIME,
        END_TIME,
        ID_CLASSROOM,
        ID_PROFFERSSOR,
        SPACE_AVAILABLE,
        ID_COURSE,
        DAYS_COUNT,
      };

      const response = await axios.post(
        "http://localhost:3000/registro/section/createSection",
        data,
        config
      );

      console.log(response);

      toast.success("Seccion Creada Exitosamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setCheck(!check);
      setEND_TIME("");
      setSTART_TIME("");
      setID_CLASSROOM("");
      setID_COURSE("");
      setID_PROFFERSSOR("");
      setSPACE_AVAILABLE("");
      setDAYS("");
      setDAYS_COUNT("");
    } catch (error) {
      console.log("Error del Submit", error);
    }
  };

  useEffect(() => {
    const getSection = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        if (!token) return;

        const response = await axios(
          "http://localhost:3000/registro/section/getSections",
          config
        );
        setSections(response.data.sections);
        console.log(response.data.sections);
      } catch (error) {
        console.log(error);
      }
    };
    getSection();
  }, [check]);

  console.log("LAS SECCIONES", sections);

  return (
    <div className="container mx-auto">
      <ToastContainer position="top-right" />
      <Modal Visible={showModal} Close={() => setShowModal(false)}>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 py-3 px-2 shadow-sm rounded-lg"
          setCheck={setCheck}
          check={check}
        >
          <div className="text-center mb-5 mt-5">
            <span className="text-sky-700 font-bold text-2xl">
              Agregar Nueva Seccion
            </span>
          </div>
          <div className="flex justify-around mt-3 w-full">
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                HI:
              </label>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={START_TIME}
                onChange={(e) => setSTART_TIME(e.target.value)}
              >
                <option value="">-- Hora Inicial --</option>
                <option value="0700">07:00</option>
                <option value="0800">08:00</option>
                <option value="0900">09:00</option>
                <option value="1000">10:00</option>
                <option value="1100">11:00</option>
                <option value="1200">12:00</option>
                <option value="1300">13:00</option>
                <option value="1400">14:00</option>
                <option value="1500">15:00</option>
                <option value="1600">16:00</option>
                <option value="1700">17:00</option>
                <option value="1800">18:00</option>
                <option value="1900">19:00</option>
                <option value="2000">20:00</option>
              </select>
            </div>
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                HF:
              </label>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={END_TIME}
                onChange={(e) => setEND_TIME(e.target.value)}
              >
                <option value="">-- Hora Final --</option>
                <option value="0700">07:00</option>
                <option value="0800">08:00</option>
                <option value="0900">09:00</option>
                <option value="1000">10:00</option>
                <option value="1100">11:00</option>
                <option value="1200">12:00</option>
                <option value="1300">13:00</option>
                <option value="1400">14:00</option>
                <option value="1500">15:00</option>
                <option value="1600">16:00</option>
                <option value="1700">17:00</option>
                <option value="1800">18:00</option>
                <option value="1900">19:00</option>
                <option value="2000">20:00</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-center">
              <label className=" text-black font-bold text-md block">
                Aula y Edificio:
              </label>
            </div>
            <div className="flex justify-center">
              <select
                value={ID_CLASSROOM}
                onChange={(e) => setID_CLASSROOM(e.target.value)}
                className="w-3/4 mx-5 text-center py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value=""> Aula - Edificio </option>
                {listAulas.map((aulas) => (
                  <option key={aulas.ID_CLASSROOM} value={aulas.ID_CLASSROOM}>
                    {aulas.NUMBER} - {aulas.building.NAME}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-center">
              <label className=" text-black font-bold text-md block">
                Nombre del Docente:
              </label>
            </div>
            <div className="flex justify-center">
              <select
                value={ID_PROFFERSSOR}
                onChange={(e) => setID_PROFFERSSOR(e.target.value)}
                className="w-3/4 mx-5 text-center py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value=""> Seleccione el Docente </option>
                {docentes.map((docente) => (
                  <option
                    key={docente.ID_PROFFERSSOR}
                    value={docente.ID_PROFFERSSOR}
                  >
                    {docente.user.NAME}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-around mt-5 w-full">
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                Cupos:
              </label>
              <input
                type="number"
                placeholder="Cupos"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 w-36"
                value={SPACE_AVAILABLE}
                onChange={(e) => setSPACE_AVAILABLE(e.target.value)}
              />
            </div>
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                Dias:
              </label>
              <select
                value={DAYS}
                onChange={(e) => setDAYS(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option>-- Dias --</option>
                <option value="LuMaMiJuVi">LuMaMiJuVi</option>
                <option value="LuMaMiJu">LuMaMiJu</option>
                <option value="LuMaMi">LuMaMi</option>
                <option value="LuMa">LuMa</option>
                <option value="LuMi">LuMi</option>
                <option value="LuJu">LuJu</option>
                <option value="MiJu">MiJu</option>
                <option value="MaJu">MaJu</option>
                <option value="Sa">Sa</option>
              </select>
            </div>
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                Unidades Valorativas:
              </label>
              <input
                type="number"
                placeholder="UV"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 w-36"
                value={DAYS_COUNT}
                onChange={(e) => setDAYS_COUNT(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-around mt-8 mb-5">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg py-2 px-8 rounded-md shadow"
            >
              Crear
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-2 px-8 rounded-md shadow"
            >
              Descartar
            </button>
          </div>
        </form>
      </Modal>
      <div className="bg-gray-100 p-3">
        <div className="w-full py-2 mt-5 mb-10 text-center">
          <span className="text-3xl font-bold text-sky-700">
            Planificacion Academica
          </span>
          <span className="text-3xl font-bold text-gray-700">
            {" "}
            "Carrera" - "Nombre del Periodo"
          </span>
        </div>
        <div className="flex justify-around mt-5 mb-5">
          <div className="flex items-center">
            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center gap-1 bg-sky-600 hover:bg-sky-700 py-2 px-3 rounded shadow text-lg text-white font-bold"
            >
              Agregar Seccion{" "}
              <AiOutlineAppstoreAdd className="mr-2" size={30} />
            </button>
          </div>
          <div className="">
            <select
              value={ID_COURSE}
              onChange={(e) => setID_COURSE(e.target.value)}
              className="bg-sky-600 hover:bg-sky-700 rounded shadow font-bold text-white text-center border-2 cursor-pointer"
            >
              <option value="">--- Seleccione una Clase ---</option>
              {listCourses.map((listcourse) => (
                <option value={listcourse.ID_COURSE} key={listcourse.ID_COURSE}>
                  {listcourse.NAME}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10">
          <table className="w-full bg-white shadow-md table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">HI</th>
                <th className="p-2">HF</th>
                <th className="p-2">Edif</th>
                <th className="p-2">Aula</th>
                <th className="p-2">Maestro</th>
                <th className="p-2">Asignatura</th>
                <th className="p-2">UV</th>
                <th className="p-2">Cupos</th>
                <th className="p-2">Seccion</th>
                <th className="p-2">Dias</th>
                <th className="p-2">Accion</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <tr className="border-b" key={section.ID_SECTION}>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    <p>{section.START_TIME}</p>
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    {section.END_TIME}
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    {section.classroom.building.NAME}
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    {section.classroom.NUMBER}
                  </td>
                  <td className="text-center border px-4 py-2 text-lg font-bold r">
                    {section.Proffessor.user.NAME}
                  </td>
                  <td className="text-center border px-4 py-2 text-lg font-bold r">
                    {section.course.NAME}
                  </td>
                  <td className="text-center border px-4 py-2 text-lg font-bold r">
                    {section.course.UV}
                  </td>
                  <td className="text-center border px-4 py-2 text-lg font-bold r">
                    {section.SPACE_AVAILABLE}
                  </td>
                  <td className="text-center border px-4 py-2 text-lg font-bold r">
                    {section.SECTION_CODE}
                  </td>
                  <td className="text-center border px-4 py-2 text-lg font-bold r">
                    {section.DAYS}
                  </td>
                  <td className="border px-4 py-2 text-lg font-bold r">
                    <div className="flex items-center gap-5">
                      <div className="mx-auto">
                        <AiFillDelete
                          className="cursor-pointer"
                          /* onClick={() => handleDelete(estudiante.ID_USER)} */
                          size={25}
                        ></AiFillDelete>
                        <span className="-mx-3 text-sm">Eliminar</span>
                      </div>
                      <div className="mx-auto">
                        <AiFillEdit
                          className="cursor-pointer"
                          /* onClick={() => handleDelete(estudiante.ID_USER)} */
                          size={25}
                        ></AiFillEdit>
                        <span className="-mx-1 text-sm">Editar</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddSections;
