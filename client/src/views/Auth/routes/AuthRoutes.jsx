import {Route, Routes} from "react-router-dom";
import ConfirmAccountForm from "../components/ConfirmAccountForm";
import RequestPasswordForm from "../components/RequestPasswordForm";
import Auth from "../Auth";
const AuthRoutes = () => { 

    return (
        <Routes>
            <Route path="/" element={<Auth>Login</Auth>}>
            </Route>
            <Route path="RecuperarContrasena" element={<RequestPasswordForm>Recuperar Contraseña</RequestPasswordForm>}>
            </Route>
            <Route path="SolicitarContrasena" element={<ConfirmAccountForm>Recuperar Solicitar contraseña</ConfirmAccountForm>}>
            </Route>
        </Routes>
    );
 }

 export default AuthRoutes;