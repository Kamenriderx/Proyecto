import "flowbite";
import { AiFillHome } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import { BiSolidContact, BiSolidKey, BiNotepad } from "react-icons/Bi";
import { BsFillChatDotsFill, BsQuestionCircleFill } from "react-icons/bs";
import {
  PiNotebookBold,
  PiComputerTowerFill,
  PiNotebookFill,
} from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { StoreContext } from "../../../store/ContextExample";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import axios from "axios";
import AlertThree from "../../../components/AlertThree";
import AlertTwo from "../../../components/AlertTwo";




const Sidevar = () => {
  //contexto de usuario
  const { state } = useContext(StoreContext);

  const [alerta, setAlerta] = useState({});
  const [message1, setMessage1] = useState(false);
  const navigate = useNavigate();
  const {message} = alerta;


  const handleMatricula = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      };

      const res = await axios.post(
        `http://localhost:3000/registro/enrollment/inscription/1`,
        { ...config }
      );
      navigate("/matricula");

    } catch (error) {
      setMessage1(true)
      // alert('ahahah')
      navigate("/perfil");
      console.log(error);
      setAlerta({
        message: error.response.data.messagge,
        error: true
      });
    }
  };

  const handleClick = () => {
    handleMatricula()
  }


  return (
    <>
          {message1 && (
        <>
          <AlertTwo alerta={alerta} />
        </>
      )}
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
              <Link to="/contactos">
                <div
                  className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                >
                  <BiSolidContact className="flex-shrink-0 w-6 h-6 text-gray-500" />

                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Contactos
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/chat"
                className="flex items-center p-2 text-gray-900 rounded-lg 
              hover:bg-orange-100 hover:font-bold"
              >
                <BsFillChatDotsFill className="flex-shrink-0 w-6 h-6 text-gray-500" />
                <span className="flex-1 ml-3 whitespace-nowrap">Chat</span>
              </Link>
            </li>
            <hr />
            <li className="text-center">
              <span className="text-gray-600">Registro</span>
            </li>

            <li>
                <div
                  onClick={ handleClick}
                  className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer
                hover:bg-orange-100 hover:font-bold"
                >
                  <PiNotebookBold className="flex-shrink-0 w-6 h-6 text-gray-500" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Matricula
                  </span>
                </div>
            </li>

            <li>
              <Link to="/solicitudes">
                <div
                  className="flex items-center p-2 text-gray-900 rounded-lg 
                hover:bg-orange-100 hover:font-bold"
                >
                  <BsQuestionCircleFill className="flex-shrink-0 w-6 h-6 text-gray-500" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Solicitudes
                  </span>
                </div>
              </Link>
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

            <li>
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
            </li>

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
