import { Routes,Route, NavLink } from "react-router-dom";
import { StoreContext } from "../store/ContextExample";
import { useContext } from "react";
import AuthRoutes from "../views/Auth/routes/AuthRoutes";


export const AppRouter = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { login } = state;
  const handleClick = () => {
    dispatch({ type: !login?'LOGIN':'LOGOUT', payload: { login:!login } });
  };
  return(
    <div>
      <button onClick={handleClick}>{login?'abrir':'cerrar'}</button><br></br>
      <ul>
        <li>
          <NavLink to="iniciar">Login</NavLink>

        </li>
        <li>
          <NavLink to="iniciar/RecuperarContraseña">Recuperar Contraseña</NavLink>

        </li>
        <li>
          <NavLink to="iniciar/SolicitarContraseña">SolicitarContraseña</NavLink>
        </li>
      </ul>


      <Routes>
        <Route path="/iniciar/*" element={<AuthRoutes/>}/>
      </Routes>
    </div>
  );
};
