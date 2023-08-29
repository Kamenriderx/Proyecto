import { useContext, useEffect, useState } from "react";
// import a from "../../assets/a.jpg";
// import fondo from "../../assets/fondo.jpg";
import fondoPerfil from "../../assets/fondoPerfil.jpg";
import { StoreContext } from "../../store/ContextExample";
import StudentContext from "./context/StudentContext";
import { httpRequests } from "../../utils/helpers/httpRequests";
import ViewTeacherPublic from "../ViewTeacher/ViewTeacherPublic";
import { DotSpinner } from "@uiball/loaders";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const PerfilDocentes = () => {
  //contexto de usuario
  const { state } = useContext(StoreContext);
  //contexto de estudiante
  const { stateStudent, getStudent } = useContext(StudentContext);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const [secciones, setSecciones] = useState(null);
  const getSeccion = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/evaluateProffesor/${stateStudent.user.ID_STUDENT}`,
        { ...config }
      );

      console.log("GET_SECCION: ", res.data);
      setSecciones(res.data);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent(state);
    getSeccion();
  }, [state]);

  const [idUserProfesor, setIdUserProfesor] = useState(null);
  const [showPerfil, setShowPerfil] = useState(false);

  const [chek, setChek] = useState(false);

  const handleClick = (ID_USER_PROFFESOR) => {
    console.log(ID_USER_PROFFESOR);
    setIdUserProfesor(ID_USER_PROFFESOR);
    setShowPerfil(true);
    setChek(!chek);
  };

  console.log("PERFIL DOCENTE", secciones)

  return (
    <>
      <div className="mx-16 mt-28">
        <div className="flex justify-start mx-10 mb-10">
          <div className="mt-5">
            <button
              onClick={handleBack}
              className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
            >
              <BiArrowBack color="#F7F9F7" size={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <p className="font-bold mb-4 text-xl text-center">
              PERFILES DE DOCENTES
            </p>
            <div className="flex flex-wrap h-20 gap-10">
              {secciones && (
                <>
                  {secciones.map((seccion) => (
                    <div key={seccion.ID_SECTION} className="w-60">
                      {seccion.PROFILE_PHOTO ? (
                        <>
                        <img
                          src={seccion.PROFILE_PHOTO}
                          alt="fondoPerfil"
                          className="rounded-full w-48 h-48 object-cover cursor-pointer shadow-xl
                          border-4 
                          active:ring-blue-500 active:border-blue-500"
                          onClick={() => handleClick(seccion.ID_USER_PROFFESOR)}
                        />
                        </>
                      ):(
                        <>
                          <img
                        src={fondoPerfil}
                        alt="fondoPerfil"
                        className="rounded-full w-48 h-48 object-cover cursor-pointer shadow-xl
                        border-4 
                        active:ring-blue-500 active:border-blue-500"
                        onClick={() => handleClick(seccion.ID_USER_PROFFESOR)}
                      />
                        </>
                      )}
                      <p className="mt-2 font-bold text-lg">Docente</p>
                      <p className="font-semibold uppercase ">
                        {seccion.NAME_PROFFESOR}
                      </p>
                      <p className="mt-2 font-bold text-lg ">Clase</p>
                      <p className="font-semibold uppercase">
                        {seccion.COURSE_NAME}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div>
            {showPerfil ? (
              <ViewTeacherPublic
                ID_USER_PROFFESOR={idUserProfesor}
                chek={chek}
              />
            ) : (
              <div className="flex justify-center mt-72">
                <DotSpinner size={60} speed={0.9} color="blue" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PerfilDocentes;
