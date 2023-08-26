import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../store/ContextExample";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineBackward } from "react-icons/ai";
const Matricula = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [sections, setSections] = useState([]);
  const [listCourses, setListCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [filteredSections, setFilteredSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Cambiado a 1 para evitar página 0
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSections.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredSections.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

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

  console.log("CLASES", listCourses);

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
  }, []);

  useEffect(() => {
    if (courseName) {
      const filtered = sections.filter(
        (section) => section.course.NAME === courseName
      );
      setFilteredSections(filtered);
    } else {
      setFilteredSections(sections);
    }
    setCurrentPage(1);
  }, [courseName, sections]);

  console.log("FILTRADOS", filteredSections);

  return (
    <div className="container mx-auto">
      <div className="flex justify-start">
        <div className="mt-5">
          <button
            onClick={handleBack}
            className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
          >
            <AiOutlineBackward color="#F7F9F7" />
          </button>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-center w-4/5">
          <div className="w-1/2">
            <select
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-auto mx-5 text-center py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100 font-bold text-gray-700"
            >
              <option value="">SELECCIONE UNA CLASE</option>
              {listCourses.map((listcourse) => (
                <option value={listcourse.NAME} key={listcourse.ID_COURSE}>
                  {listcourse.NAME}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          {filteredSections ? (
            <>
              <div className="mt-10">
                {currentItems?.length > 0 ? (
                  <>
                    <table className="w-full bg-white shadow-md table-auto">
                      <thead className="bg-blue-800 text-white">
                        <tr>
                          <th className="p-2">Detalles</th>
                          <th className="p-2">Asignatura</th>
                          <th className="p-2">Sección</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((section) => (
                          <tr className="border-b" key={section.ID_SECTION}>
                            <td className="text-center border px-4 py-2 text-sm font-medium r">
                              <Link
                                to={`/sections/${section.ID_SECTION}`}
                                className="text-sky-600 hover:text-sky-700 underline"
                              >
                                Ver Sección
                              </Link>
                            </td>
                            <td className="text-center border px-4 py-2 text-sm font-medium r">
                              {section.course.NAME}
                            </td>
                            <td className="text-center border px-4 py-2 text-sm font-medium r">
                              {section.SECTION_CODE}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <p className="text-2xl text-center uppercase font-bold ">
                    No se encontraron resultados de la clase seleccionada
                  </p>
                )}
              </div>
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
            <>
              <div className="mt-10">
                {filteredSections?.length > 0 ? (
                  <>
                    <table className="w-full bg-white shadow-md table-auto">
                      <thead className="bg-blue-800 text-white">
                        <tr>
                          <th className="p-2">Detalles</th>
                          <th className="p-2">Asignatura</th>
                          <th className="p-2">Sección</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSections.map((section) => (
                          <tr className="border-b" key={section.ID_SECTION}>
                            <td className="text-center border px-4 py-2 text-sm font-medium r">
                              <Link
                                to={`/sections/${section.ID_SECTION}`}
                                className="text-sky-600 hover:text-sky-700 underline"
                              >
                                Ver Sección
                              </Link>
                            </td>
                            <td className="text-center border px-4 py-2 text-sm font-medium r">
                              {section.course.NAME}
                            </td>
                            <td className="text-center border px-4 py-2 text-sm font-medium r">
                              {section.SECTION_CODE}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <p className="text-2xl text-center uppercase font-bold ">
                    No se encontraron resultados de la clase seleccionada
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matricula;
