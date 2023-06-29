import "flowbite";
import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../views/NotFound";


const ContentNavbar = () => {
  const [user, setUser] = useState(null);
  const [stateLogin, setStateLogin] = useState(false)

  const login = () => {
    //request done server
    setStateLogin(true)
    setUser({
      id: 1,
      name: "john",
      roles: ["docente"],
      permissions: ['jefe']
    });
   
  };
  const logout = () => {
    setStateLogin(false)
    setUser(null)
  };

  const Navbar = () => {

    return (
      <>
        <nav className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center">

              <Link to="/">
              <img src="https://www.unah.edu.hn/themes/portalunah/assets/images/logo-unah.png" className="h-16 mr-3" alt="UNAH Logo" />

              </Link>
            </div>
            <div className="flex md:order-2">
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
                <li>
                  <Link to="formEstudiante">
                    <button className="block p-2 rounded  hover:bg-gray-100 hover:text-blue-700">
                      Estudiantes
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="formDocente">
                    <button className="block p-2 rounded  hover:bg-gray-100 hover:text-blue-700">
                      Docentes
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="formAdministrador">
                    <button className="block p-2 rounded  hover:bg-gray-100 hover:text-blue-700">
                      Administradores
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </>
    );
  };

  //Formularios
  const FormStudent = () => {
    return (
      <div className="bg-green-400 text-2xl font-bold p-4">
        <p>Form Student</p>
        <Link to="estudiante">
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-xl px-4 py-2 text-center"
            onClick={login}
          >
            Login
          </button>
        </Link>
      </div>
    );
  };

  const FormTeacher = () => {
    return (
      <div className="bg-green-400 text-2xl font-bold p-4">
        <p>Form Teacher</p>
        <Link to="docente">
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-xl px-4 py-2 text-center"
          onClick={login}
        >
          Login
        </button>
        </Link>
      </div>
    );
  };

  const FormAdministrator = () => {
    return (
      <div className="bg-green-400 text-2xl font-bold p-4">
        <p>Form Administrator</p>
        <Link to="administrador">
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-xl px-4 py-2 text-center"
          onClick={login}
        >
          Login
        </button>
        </Link>
      </div>
    );
  };

  const Principal = () => {
    return (
      <div className="bg-green-400 text-2xl font-bold p-4">
        <p>Page principal</p>
      </div>
    );
  };

  // Vistas
  const Student = () => {
    return (
      <div className="bg-green-400 text-2xl font-bold p-4">
        <p>Page Student</p>
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-xl px-4 py-2 text-center"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    );
  };

  const Administrator = () => {
    return (
      <div className="bg-green-400 text-2xl font-bold p-4">
        <p>Page Administrator</p>
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-xl px-4 py-2 text-center"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    );
  };

  const Teacher = () => {
    return (
      <div className="bg-green-400 text-2xl font-bold p-4">
        <p>Page Teacher</p>
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-xl px-4 py-2 text-center"
          onClick={logout}
        >
          Logout
        </button>
      </div>
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
          <Route exact path="/formEstudiante" element={<FormStudent />} />
          <Route exact path="/formDocente" element={<FormTeacher />} />
          <Route exact path="/formAdministrador" element={<FormAdministrator />} />

          {/* rutas privadas */}
          <Route
            exact path="/formEstudiante/estudiante"
            element={
              <ProtectedRoute
                isAllowed={!!user && user.roles.includes("estudiante")}
                login = {stateLogin}
              >
                <Student />
              </ProtectedRoute>
            }
          />

          <Route
            exact path="/formDocente/docente"
            element={
              <ProtectedRoute
                isAllowed={!!user && user.roles.includes("docente") && user.permissions.includes("jefe")}
                login = {stateLogin}
              >
                <Teacher />
              </ProtectedRoute>
            }
          />

          <Route
            exact path="/formAdministrador/administrador"
            element={
              <ProtectedRoute
                isAllowed={!!user && user.roles.includes("administrador")}
                login = {stateLogin}
              >
                <Administrator />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default ContentNavbar;
