import { GiLynxHead } from "react-icons/gi";
import { useState } from "react";

const LoginForm = () => {
    

    const [login, setLogin] = useState({
        USER_PASSWORD: "",
        ACCOUNT_NUMBER: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({
          ...login,
          [name]: value.trim(),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,10}$/;
        const accountRe = /^\d{11}$/;
        console.log(login.USER_PASSWORD,login.ACCOUNT_NUMBER);
        if(!passwordRe.test(login.USER_PASSWORD) && !accountRe.test(login.USER_PASSWORD)){
            alert("Sus credenciales de sesión son incorrectas");
        }


       
    }
    
    return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "70%",
      }}
      className="p-6 mx-auto bg-white rounded-xl shadow-lg items-center  space-x-4 animate__zoomIn animate__animated"
    >
      <div className="flex flex-row justify-center items-center mb-3">
        <GiLynxHead style={{ width: "40px", height: "40px" }} />
        <h2
          className="text-gray-800 text-xl font-bold text-center flex items-center"
          htmlFor="email"
        >
          Portal East High
        </h2>
      </div>

      <label
        className="block text-gray-300 text-sm font-bold mb-2 text-center"
        htmlFor="email"
      >
        Ingresar
      </label>
      <input
        className="w-3/5 mt-3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
        id="email"
        name="ACCOUNT_NUMBER"
        placeholder="Numero de cuenta"
        onChange={handleChange}
      />

      <input
        className="mt-3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/5"
        id="password"
        name="USER_PASSWORD"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />

      <button className="px-4 py-1 w-3/5 text-sm text-purple-600 font-semibold rounded-md border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2  mt-5 " onClick={handleSubmit}>
        Iniciar sesion
      </button>
    </form>
  );
};

export default LoginForm;
