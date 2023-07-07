import "flowbite";
import "animate.css";
import { useContext, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NotFound from "../views/NotFound";
import Auth from "../views/Auth/Auth";
import { StoreContext } from "../store/ContextExample";
import RequestPasswordForm from "../views/Auth/components/RequestPasswordForm";
import Docentes from "../views/RegisterDocente/Docentes";
import ReadCSV from "../components/ReadCSV";
import Principal from "../views/Principal";
import ViewStudent from "../views/ViewStudent/ViewStudent";
import ViewTeacher from "../views/ViewTeacher/ViewTeacher";
import useStudents from "../utils/hooks/useStudents";
import Search from "./components/Search";
import Solicitud from "./components/Solicitud";
import ResultsSearch from "./ResultsSearch";
/* import InitialSession from "./components/InitialSession"; */


const ContentNavbar = () => {
  const { state, dispatch } = useContext(StoreContext);

  const {students} = useStudents()

  const handleSession = () => {
    dispatch({ type: "USER", user: {} });
    dispatch({ type: "TOKEN", token: "" });
    dispatch({ type: "LOGOUT" });
  };

  const Navbar = () => {
    const { state, dispatch } = useContext(StoreContext);
    console.log('EstudiantesData',students);
    console.log('Usuario Conectado',state);
    return (
      <>
        <nav className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-normal mx-auto p-4">
            <div className="flex items-center">
              <Link to="/">
                <img
                  src="https://www.unah.edu.hn/themes/portalunah/assets/images/logo-unah.png"
                  className="h-16 mr-3"
                  alt="UNAH Logo"
                />
              </Link>
            </div>
            <div className="flex">
              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                aria-controls="navbar-cta"
                aria-expanded="false"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex flex-col font-bold text-2xl p-2 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-4 md:my-0 md:border-0 ">
                {!state.login ? (
                  <li>
                    <Link to="/login">
                      <button className="p-2 rounded  hover:bg-gray-100 hover:text-blue-700">
                        Inicio de sesión
                      </button>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/">
                        <button
                          onClick={handleSession}
                          className="p-2 rounded  hover:bg-gray-100 hover:text-blue-700"
                        >
                          Cerrar sesion
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="perfil">
                        <button className="block p-2 rounded  hover:bg-gray-100 hover:text-blue-700">
                          Perfil
                        </button>
                      </Link>
                    </li>
                  </>
                )}
                {state?.user?.ID_ROLE === 5 && (
                  <>
                    <li>
                      <Link to="/Estudiantes">
                        <button className="block p-2 rounded  hover:bg-gray-100 hover:text-blue-700">
                          Estudiantes
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Docentes">
                        <button className="block p-2 rounded  hover:bg-gray-100 hover:text-blue-700">
                          Docentes
                        </button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  };

  const Profile = () => {
    const { state } = useContext(StoreContext);
    console.log(state);

    return (
      <>
        {state?.user?.ID_ROLE === 1 ? <ViewStudent /> : <ViewTeacher />}
      </>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* rutas publicas */}
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<Principal />} />
          <Route exact path="/login" element={<Auth />} />
          <Route exact path="/proffessor" />
          <Route
            exact
            path="/iniciar/RecuperarContrasena"
            element={<RequestPasswordForm />}
          />
          <Route exact path="/Estudiantes" element={<ReadCSV />} />

          {/* rutas privadas */}
          <Route exact path="/perfil" element={<Profile />} />

          <Route exact path="/Docentes" element={<Docentes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default ContentNavbar;
