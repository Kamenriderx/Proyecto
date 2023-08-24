import { useContext } from "react";
import "flowbite";
import { AiFillHome } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import {
  BiSolidContact,
  BiSolidKey,
  BiNotepad,
  BiSolidSchool,
} from "react-icons/Bi";
import {
  BsFillChatDotsFill,
  BsQuestionCircleFill,
  BsCardChecklist,
  BsUniversalAccessCircle,
} from "react-icons/bs";
import {
  PiNotebookBold,
  PiComputerTowerFill,
  PiNotebookFill,
  PiStudentFill
} from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { FaHistory } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { StoreContext } from "../../../store/ContextExample";
import { FcPlanner, FcCancel, FcRatings } from "react-icons/fc";
import { Link } from "react-router-dom";

const Sidevar = () => {
  const { state, dispatch } = useContext(StoreContext);
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mt-24"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <ul className="space-y-2 font-medium">
            <li className="text-center">
              <span className="text-gray-600">Menú</span>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <AiFillHome className="flex-shrink-0 w-6 h-6 text-gray-500" />

                <span className="flex-1 ml-3 whitespace-nowrap">Inicio</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <IoMdContact className="flex-shrink-0 w-6 h-6 text-gray-500" />

                <span className="flex-1 ml-3 whitespace-nowrap">Perfil</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <BiSolidContact className="flex-shrink-0 w-6 h-6 text-gray-500" />

                <span className="flex-1 ml-3 whitespace-nowrap">Contactos</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <BsFillChatDotsFill className="flex-shrink-0 w-6 h-6 text-gray-500" />

                <span className="flex-1 ml-3 whitespace-nowrap">Chat</span>
              </a>
            </li>
            <hr />
            <li className="text-center">
              <span className="text-gray-600">Registro</span>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <PiNotebookBold className="flex-shrink-0 w-6 h-6 text-gray-500" />
                <span className="flex-1 ml-3 whitespace-nowrap">Matricula</span>
              </a>
            </li>
            <li>
              <Link
                to="/students"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <PiStudentFill className="flex-shrink-0 w-6 h-6 text-gray-500" />
                <span className="flex-1 ml-3 whitespace-nowrap">Estudiantes</span>
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <BsQuestionCircleFill className="flex-shrink-0 w-6 h-6 text-gray-500" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Solicitudes
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <FaHistory className="flex-shrink-0 w-6 h-6 text-gray-500" />
                <span className="flex-1 ml-3 whitespace-nowrap">Historial</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <PiComputerTowerFill className="flex-shrink-0 w-6 h-6 text-gray-500" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Laboratorios
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <BiSolidKey className="flex-shrink-0 w-6 h-6 text-gray-500" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Cambio de clave
                </span>
              </a>
            </li>
            {state?.user?.ID_ROLE === 2 && (
              <>
                <li>
                  <Link to="/secciones-Docente">
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                    >
                      <SiGoogleclassroom className="flex-shrink-0 w-6 h-6 text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Secciones
                      </span>
                    </a>
                  </Link>
                </li>
              </>
            )}
            {state?.user?.ID_ROLE === 4 && (
              <>
                <li>
                  <Link to="/solicitudes-coordinador-centro">
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                    >
                      <BiSolidSchool className="flex-shrink-0 w-6 h-6 text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Solicitudes de Centro
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/solicitudes-coordinador">
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                    >
                      <BsUniversalAccessCircle className="flex-shrink-0 w-6 h-6 text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Solicitudes de Carrera
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/Periodos">
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                    >
                      <FcPlanner className="flex-shrink-0 w-6 h-6 text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Descargar Planificacion
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/listAlumnos-coordi">
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                    >
                      <BsCardChecklist className="flex-shrink-0 w-6 h-6 text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Listado Alumnos
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/solicitudesExcepcionales-coordinador">
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                    >
                      <FcCancel className="flex-shrink-0 w-6 h-6 text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Solicitudes Excepcionales
                      </span>
                    </a>
                  </Link>
                </li>
              </>
            )}

            {state?.user?.ID_ROLE === 3 && (
              <>
                <li>
                  <Link to="/matricula-jefe">
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                    >
                      <PiNotebookBold className="flex-shrink-0 w-6 h-6 text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Matricula
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/addSections">
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                    >
                      <PiNotebookFill className="flex-shrink-0 w-6 h-6 text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Programación
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/list-teachers">
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                    >
                      <AiOutlineUnorderedList className="flex-shrink-0 w-6 h-6 text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Listado de Docentes
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/docentes-jefe-calif">
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                    >
                      <FcRatings className="flex-shrink-0 w-6 h-6 text-gray-500" />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Calificaciones Docentes
                      </span>
                    </a>
                  </Link>
                </li>
              </>
            )}

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
              >
                <BiNotepad className="flex-shrink-0 w-6 h-6 text-gray-500" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Calificaciones
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidevar;
