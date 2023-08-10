import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../store/ContextExample";

const Matricula = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [sections, setSections] = useState([]);
  const [listCourses, setListCourses] = useState([]);
  const [ID_COURSE, setID_COURSE] = useState("");
  const [filteredSections, setFilteredSections] = useState([]);

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
    if (ID_COURSE) {
      const filtered = sections.filter(
        (section) => section.course.ID_COURSE === ID_COURSE
      );
      setFilteredSections(filtered);
    } else {
      setFilteredSections(sections);
    }
  }, [ID_COURSE, sections]);

  return (
    <div className="container mx-auto">
      <div className="mt-10">
        <div className="flex justify-center w-3/4">
          <div className="w-1/2 mt-10">
            <select
              value={ID_COURSE}
              onChange={(e) => setID_COURSE(e.target.value)}
              className="w-3/4 mx-5 text-center py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Seleccione una Clase</option>
              {listCourses.map((listcourse) => (
                <option value={listcourse.ID_COURSE} key={listcourse.ID_COURSE}>
                  {listcourse.NAME}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <div className="mt-10">
            {filteredSections?.length > 0 ? (
              <>
                <table className="w-full bg-white shadow-md table-auto">
                  <thead className="bg-blue-800 text-white">
                    <tr>
                      <th className="p-2">Asignatura</th>
                      <th className="p-2">Seccion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSections.map((section) => (
                      <tr className="border-b" key={section.ID_SECTION}>
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
                No Hay Clases por el Momento
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matricula;
