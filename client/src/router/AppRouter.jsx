import { Routes,Route, NavLink } from "react-router-dom";
import GetRoutesExample from "../views/GetExample/routes/GetRoutesExample";
import DeleteRoutesExample from "../views/DeleteExample/routes/DeleteRoutesExample";
import PostRoutesExample from "../views/PostExample/routes/PostRoutesExample";
import UpdateRoutesExample from "../views/UpdateExample/routes/UpdateRoutesExample";
import { StoreContext } from "../store/ContextExample";
import { useContext } from "react";


export const AppRouter = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { login } = state;
  const handleClick = () => {
    dispatch({ type: !login?'LOGIN':'LOGOUT', payload: { login:!login } });
  };
  return(
    <div>
      <button onClick={handleClick}>{login?'abrir':'cerrar'}</button><br></br>
      <NavLink to="get">GET</NavLink>
      <NavLink to="del">DELETE</NavLink>
      <NavLink to="put">UPDATE</NavLink>
      <NavLink to="post">POST</NavLink>
      <Routes>
        <Route path="/get/*" element={<GetRoutesExample/>}/>
        <Route path="/del/*" element={<DeleteRoutesExample/>}/>
        <Route path="/post/*" element={<PostRoutesExample/>}/>
        <Route path="/put/*" element={<UpdateRoutesExample/>}/>
      </Routes>
    </div>
  );
};
