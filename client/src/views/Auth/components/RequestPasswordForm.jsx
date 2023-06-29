import "animate.css";
import { useState } from "react";
import { GiLynxHead } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import { useNavigate } from 'react-router-dom';
const RequestPasswordForm = () => {

  const [passwords, setPasswords] = useState({
    passwordA: "",
    passwordB: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { passwordA, passwordB } = passwords;
    setPasswords({
        passwordA: "",
        passwordB: "",
      });
    const token = params.get("token");
    const options = {
        body:{
            "USER_PASSWORD":passwordA
        }

    }
    const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,10}$/;
    if (passwordA === "" || passwordB === "") {
      alert("Debe rellenar todos los campos");
      return;
    }

    if (passwordA !== passwordB) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!regularExpression.test(passwordA)) {
      alert(
        "La contraseña debe tener una combinacion de minusculas,mayusculas,numeros y debe tener menos de 11 digitos"
      );
      return;
    }

    let response = await httpRequests()["put"](`http://localhost:3000/registro/resetPassword/${token}`,options);

    if(response.status === 200){
        alert(response.data.message);
        navigate("/iniciar");
    }else{
        alert("Algo salio mal");
    }
  };

  return (
    <form
      action=""
      className="p-6 mx-auto bg-white rounded-xl shadow-lg items-center  space-x-4 animate__zoomIn animate__animated"
      style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        width:"70%"

    }}
    >
      <div className="flex flex-row justify-center items-center mb-3">
        <GiLynxHead style={{ width: "40px", height: "40px" }} />
        <h2
          className="text-gray-800 text-xl font-bold text-center flex items-center"
        >
          Portal East High
        </h2>
      </div>
      <div className="text-center space-y-2 sm:text-left">
        <label
          className="block text-gray-300 text-sm font-bold mb-2 text-center"
        >
          Recuperacion de contraseña
        </label>
        <div className="mb-4">
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="passwordA"
              type="password"
              placeholder="Contraseña"
              value={passwords.passwordA}
              max={10}
              onChange={handleChange}
              name="passwordA"
            />
          </div>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="passwordB"
            type="password"
            placeholder="Repite tu contraseña"
            value={passwords.passwordB}
            max={10}
            onChange={handleChange}
            name="passwordB"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-md border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2  mt-5 w-full"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default RequestPasswordForm;
