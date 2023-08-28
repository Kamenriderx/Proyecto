import "flowbite";
import Video from "./components/Video";
import { StoreContext } from "../../store/ContextExample";
import { useContext, useEffect, useState } from "react";
import Sidevar from "./components/Sidevar";
import axios from "axios";
import TeacherContext from "./context/TeacherContext";
import { MdEmail } from "react-icons/Md";
import fondoPerfil from "../../../src/assets/fondoPerfil.jpg";

const ViewTeacher = () => {
  const { state, dispatch, periodo } = useContext(StoreContext);
  const { stateTeacher, getTeacher } = useContext(TeacherContext);
  console.log("PERIODO", periodo);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getTeacher(state);
  }, [state]);

  useEffect(() => {
    const getClassTeacher = async () => {
      try {
        const response = await axios(
          `http://localhost:3000/registro/section/sectionsForProfessors/${state.user.ID_USER}/${periodo.ID_PERIOD}`
        );
        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClassTeacher();
  }, [state.user.ID_USER]);

  console.log("clases", classes);
  console.log("ESTADO PERFIL TEACHER", stateTeacher);

  return (
    <>
      {stateTeacher && (
        <>
          <Sidevar />
          {stateTeacher.role === 2 ||
          stateTeacher.role === 3 ||
          stateTeacher.role === 4 ? (
            <>
              <div className="grid grid-cols-3">
                <div className="col-span-3 p-4 pl-72">
                  <div className="w-full border-2 border-gray-300">
                    <div className="flex flex-row items-center justify-center">
                      <div className="mx-auto w-32 h-24 justify-end flex rounded-full mb-10 mt-5">
                        {stateTeacher.user.PROFILE_PHOTO ? (
                          <img
                            src={stateTeacher.user.PROFILE_PHOTO}
                            alt="Perfil del docente"
                            className="rounded-full -mx-24"
                          />
                        ) : (
                          <img
                            src={fondoPerfil}
                            alt="Perfil del docente"
                            className="rounded-full -mx-24"
                          />
                        )}
                      </div>
                      <div className="w-2/3">
                        <div className="flex flex-col m-4">
                          <div className="font-bold">
                            <p className="text-xl">
                              {stateTeacher.user.user.NAME}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {stateTeacher.user.CAREER}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-2 border-gray-300 mt-8">
                <div className="p-2 border-b-2 border-gray-300 text-xl bg-gray-50">
                  <div className="flex justify-between">
                    <div className="mx-96">Información</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <div className="flex m-4 items-center gap-2 border-b-2 pb-2 mx-96">
                      <MdEmail className="flex-shrink-0 w-8 h-8 text-gray-500" />
                      <div className="-mx-32">
                        <div className="text-sm mx-36">Correo Personal</div>
                        <div className="mx-36">
                          {stateTeacher.user.user.EMAIL}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex m-4 items-center gap-2 border-b-2 pb-2">
                      <MdEmail className="flex-shrink-0 w-8 h-8 text-gray-500" />
                      <div>
                        <div className="text-sm ">Correo Institucional</div>
                        <div>{stateTeacher.user.INSTITUTIONAL_EMAIL}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 p-4 sm:ml-64 -mt-4">
                <div className="col-span-2">
                  <div className="bg-gray-200 m-8 rounded-xl w-auto h-96  ">
                    <Video />
                  </div>
                </div>
                <div className="overflow-hidden hover:overflow-auto h-96 mt-8 mr-8">
                  <div className="flex flex-col">
                    {classes.map((clase) => (
                      <div
                        className="bg-gray-200 mb-4 rounded-xl w-auto flex flex-col items-center font-bold text-sm p-2"
                        key={clase.ID_SECTION}
                      >
                        <div>{clase.CODE_COURSE}</div>

                        <div>{clase.NAME}</div>
                        <div className="flex gap-2">
                          <div>{clase.SECTION_CODE}</div> -
                          <div>{clase.DAYS}</div>
                        </div>
                        <div className="flex gap-2">
                          <div>{clase.START_TIME}</div> -
                          <div>{clase.END_TIME}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-6 p-4 sm:ml-64 -mt-4">
                <div className="col-span-2">
                  <div className="bg-gray-200 m-8 rounded-xl w-auto h-96  ">
                    <Video />
                  </div>
                </div>
                <div className="overflow-hidden hover:overflow-auto h-96 mt-8 mr-8">
                  <div className="flex flex-col">
                    {classes.map((clase) => (
                      <div
                        className="bg-gray-200 mb-4 rounded-xl w-auto flex flex-col items-center font-bold text-sm p-2"
                        key={clase.ID_SECTION}
                      >
                        <div>{clase.CODE_COURSE}</div>

                        <div>{clase.NAME}</div>
                        <div className="flex gap-2">
                          <div>{clase.SECTION_CODE}</div> -
                          <div>{clase.DAYS}</div>
                        </div>
                        <div className="flex gap-2">
                          <div>{clase.START_TIME}</div> -
                          <div>{clase.END_TIME}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ViewTeacher;
