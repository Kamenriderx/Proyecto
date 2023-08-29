import "animate.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import { useNavigate } from "react-router-dom";
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
      body: {
        USER_PASSWORD: passwordA,
      },
    };
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

    let response = await httpRequests()["put"](
      `http://localhost:3000/registro/resetPassword/${token}`,
      options
    );

    if (response.status === 200) {
      alert(response.data.message);
      navigate("/login");
    } else {
      alert("Algo salio mal");
    }
  };

  return (
    <form
      action=""
      className="p-6 mx-auto bg-white rounded-xl shadow-lg items-center  space-x-4 animate__zoomIn animate__animated"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "70%",
      }}
    >
      <div className="flex flex-row justify-center items-center mb-3"></div>
      <div className="text-center space-y-2 sm:text-left">
        <label className="block text-gray-300 text-sm font-bold mb-2 text-center">
          Recuperacion de contraseña
        </label>
        <div className="mb-4">
          <div className="mb-4">

            <input
            className="mt-3 shadow  border border-none focus:ring-0 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
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
            className="mt-3 shadow  border border-none focus:ring-0 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
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
      <div className="flex justify-center w-1/5">
        <button
          className="px-4 py-1 w-full text-sm text-sky-500 font-semibold rounded-md border border-purple-200 hover:text-white hover:bg-sky-500 hover:border-transparent focus:outline-none    mt-5 "
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default RequestPasswordForm;
