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
import ListTeachers from "./ListTeachers";
import ConfirTeachers from "../views/Auth/components/ConfirTeachers";
import ViewChat from "../views/ViewChat/ViewChat";
import ListContacts from "../views/DeleteContacts/components/ListContacts";
import AddSections from "../views/AddSections/AddSections";
import Requests from "../views/Solicitudes/Requests";
import CambioCarrera from "../views/Solicitudes/components/CambioCarrera";
import RequestStudent from "../views/Solicitudes/RequestStudent";
import RequestCoordinator from "../views/Solicitudes/RequestCoordinator";
import RequestRepo from "../views/Solicitudes/RequestRepo";
import RequestCenter from "../views/Solicitudes/RequestCenter";
import DictamentCarrera from "../views/Solicitudes/DictamentCarrera";
/* import InitialSession from "./components/InitialSession"; */

const ContentNavbar = () => {
  const { state, dispatch } = useContext(StoreContext);

  const { students } = useStudents();

  const handleSession = () => {
    dispatch({ type: "USER", user: {} });
    dispatch({ type: "TOKEN", token: "" });
    dispatch({ type: "LOGOUT" });
    console.log(state.socket);
    state.socket?.close();
  };

  const Navbar = () => {
    const { state, dispatch } = useContext(StoreContext);

    return (
      <>
        <nav className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center">
              <Link to="/">
                <img
                  src="https://www.unah.edu.hn/themes/portalunah/assets/images/logo-unah.png"
                  className="h-16 mr-3"
                  alt="UNAH Logo"
                />
              </Link>
            </div>
            <div className="flex items-center justify-center">
              {" "}
              {state?.user?.ID_ROLE === 1 && (
                <Search className="text-4xl px-6 py-3 rounded-lg border border-gray-300" />
              )}{" "}
            </div>
            <div
              className="items-center justify-end w-full md:w-auto md:order-1 md:flex md:items-center"
              id="navbar-cta"
            >
              <ul className="flex flex-col font-bold text-2xl p-2 mt-4 border border-red-100 rounded-lg md:flex-row md:space-x-4 md:my-0 md:border-0 ">
                {state?.user?.ID_ROLE === 4 && (
                  <>
                    <li>
                      <Link to="/solicitudes-coordinador">
                        <button className="block p-2 rounded hover:bg-gray-100 hover:text-blue-700">
                          Solicitudes
                        </button>
                      </Link>
                    </li>
                  </>
                )}
                {state?.user?.ID_ROLE === 5 && (
                  <>
                    <li>
                      <Link to="/Estudiantes">
                        <button className="block p-2 rounded hover:bg-gray-100 hover:text-blue-700">
                          Estudiantes
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Docentes">
                        <button className="block p-2 rounded hover:bg-gray-100 hover:text-blue-700">
                          Docentes
                        </button>
                      </Link>
                    </li>
                  </>
                )}
                {!state.login ? (
                  <li>
                    <Link to="/login">
                      <button className="p-2 rounded bg-sky-600 text-white font-bold hover:bg-sky-700 px-3">
                        Inicio de sesión
                      </button>
                    </Link>
                  </li>
                ) : (
                  <>
                    <div className="md:flex md:items-center flex-grow gap-x-5">
                      {" "}
                      {/* Moved the button to the right end */}
                      {state?.user?.ID_ROLE === 1 && (
                        <li>
                          <Solicitud />
                        </li>
                      )}
                      <Link to="/">
                        <button
                          onClick={handleSession}
                          className="p-2 rounded bg-sky-600 text-white font-bold hover:bg-sky-700 px-3"
                        >
                          Cerrar sesion
                        </button>
                      </Link>
                    </div>
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

    return (
      <>
        {state?.user?.ID_ROLE === 1 ? (
          <ViewStudent />
        ) : state?.user?.ID_ROLE === 2 ? (
          <ViewTeacher />
        ) : state?.user?.ID_ROLE === 3 ? (
          <ViewTeacher />
        ) : (
          <h2>Admin</h2>
        )}
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
          <Route exact path="/recuperar-teacher" element={<ConfirTeachers />} />
          <Route exact path="/login" element={<Auth />} />
          <Route exact path="/search" element={<ResultsSearch />} />
          <Route exact path="/proffessor" />
          <Route
            exact
            path="/iniciar/RecuperarContrasena"
            element={<RequestPasswordForm />}
          />
          <Route exact path="/Estudiantes" element={<ReadCSV />} />
          {/* rutas privadas */}
          <Route exact path="/perfil" element={<Profile />} />
          <Route exact path="/list-teachers" element={<ListTeachers />} />
          <Route exact path="/chat" element={<ViewChat />} />
          <Route exact path="/contactos" element={<ListContacts />} />
          <Route exact path="/addSections" element={<AddSections />} />
          <Route exact path="/solicitudes" element={<Requests />} />
          <Route exact path="/cambio-carrera" element={<CambioCarrera />} />
          <Route
            exact
            path="/solicitudes-estudiantes"
            element={<RequestStudent />}
          />
          <Route
            exact
            path="/solicitudes-coordinador"
            element={<RequestCoordinator />}
          />
          <Route
            exact
            path="/dictamen-carrera"
            element={<DictamentCarrera />}
          />
          <Route exact path="/solicitudes-centro" element={<RequestCenter />} />
          <Route exact path="/pago-reposicion" element={<RequestRepo />} />
          <Route exact path="/Docentes" element={<Docentes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default ContentNavbar;
