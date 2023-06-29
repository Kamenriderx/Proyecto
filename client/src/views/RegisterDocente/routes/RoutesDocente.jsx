import { Route, Routes } from "react-router-dom";
import RutaProtegidaAdmin from "../../../router/RutaProtegidaAdmin";
import Docentes from "../Docentes";

function RoutesDocente() {
  return (
    <Routes>
      <Route path="/" element={<RutaProtegidaAdmin />}>
        <Route index element={<Docentes />} />
      </Route>
    </Routes>
  );
}

export default RoutesDocente;
