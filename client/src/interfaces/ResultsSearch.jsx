import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStudents from "../utils/hooks/useStudents";
import CardTeachers from "./components/CardTeachers";
import { StoreContext } from "../store/ContextExample";
import { BiArrowBack } from "react-icons/Bi";

const ResultsSearch = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const handleVolverAtras = () => {
    navigate(-1);
  };

  const { students, solicitudes } = useStudents();
  const { state, dispatch } = useContext(StoreContext);

  const studentsFilteres = students.filter(
    ({ user }) =>
      (user.NAME.toLowerCase().includes(location.state.toLowerCase()) &&
        user.ID_USER !== state.user.ID_USER) ||
      (user.ACCOUNT_NUMBER.toString().includes(location.state.toLowerCase()) &&
        user.ID_USER !== state.user.ID_USER)
  );

  return (
    <div className="">
      <p className="text-md text-gray-700 text-2xl font-bold uppercase py-5">
        Se encontraron <span>{studentsFilteres.length}</span> resultados :
      </p>
      <button
        className="bg-sky-600 hover:bg-sky-800 cursor-pointer rounded-lg shadow py-2 px-3 text-white text-xl mx-3 font-bold"
        onClick={handleVolverAtras}
      >
        <BiArrowBack />
      </button>
      <div className="grid grid-cols-2">
        {studentsFilteres.map((student) => (
          <CardTeachers student={student} key={student.ID_STUDENT} />
        ))}
      </div>
    </div>
  );
};

export default ResultsSearch;
