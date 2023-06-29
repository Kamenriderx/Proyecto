import { Routes,Route} from "react-router-dom";

import AuthRoutes from "../views/Auth/routes/AuthRoutes";


export const AppRouter = () => {

  return(
    <div className="max-h-full w-full align-middle justify-center" >
      <Routes>
        <Route path="/iniciar/*" element={<AuthRoutes/>}/>
      </Routes>
    </div>
  );
};
