import { GiLynxHead } from "react-icons/gi";
import { useContext, useState } from "react";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import { useNavigate } from "react-router";
import { StoreContext } from "../../../store/ContextExample";

const style = {
  button: {
    width: "33%",
    height:"100%",
    cursor: "pointer",
  },
  buttonContainer:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    top:0,
    height:"50px",
    width: "50%",
    marginBottom: "20px",
  },
  loginForm:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "70%",
  }

};

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    password: "",
    identifier: "",
    loginType: "students",
  });

  const [className,setClassName] = useState({
    admins:{
      className:""
    },
    professors:{
      className:""
    },
    students:{
      className:"outline-none ring-2 ring-purple-600 bg-purple-600  ring-offset-2  text-white"
    }
  });

  const { dispatch } = useContext(StoreContext);

  
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value.trim(),
    });
  };
  console.log(`http://localhost:3000/registro/login/${login.loginType}`);
  const handleSelect = (e)=>{
    e.preventDefault();
    const { value } = e.target;
    const defaultState = {
      admins:{
        className:""
      },
      professors:{
        className:""
      },
      students:{
        className:""
      }
    }
    defaultState[value].className = "outline-none ring-2 ring-purple-600 ring-offset-2 bg-purple-600 text-white" 
    setClassName(
      defaultState
    );
    handleChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
/*     const passwordRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,10}$/;
    const accountRe = /^\d{11}$/; */



    if(login.password.trim()==="" || login.identifier.trim()===""){
      alert("Debes llenar todos los campos");
      return;
    }

/*     if(!passwordRe.test(login.password.trim())){
      alert("La contraseña no es valida");
      return;
    }

    if(!accountRe.test(login.identifier.trim())){
      alert("El numero de cuenta no es valido");
      return;
    } */

    const res = await httpRequests()["post"](`http://localhost:3000/registro/login/${login.loginType}`, { body: { ...login } });

    if (res.status === 200) {

      const token = res.data.token;
      localStorage.setItem("token", token);


      dispatch({ type: "USER", user: res.data.user });
      dispatch({ type: "TOKEN", token: res.data.token });
      dispatch({ type: "LOGIN" });
      navigate(`/perfil`);
    } else {
      alert("Credenciales de sesion incorrectas");
    }
  };
  return (
    <form style={style.loginForm} className="p-6 mx-auto bg-white rounded-xl shadow-lg items-center  space-x-4 animate__zoomIn animate__animated">
      {
        // todo Cambiar esto a una barra 
      } 
      <div style={style.buttonContainer}>
        <button style={style.button} className={` hover:text-white hover:bg-purple-600 hover:border-transparent ${className.professors.className}`} name="loginType" value="professors" onClick={handleSelect}>
          Profesores
        </button>
        <button style={style.button} className={` hover:text-white hover:bg-purple-600 hover:border-transparent ${className.students.className}`} name="loginType" value="students" onClick={handleSelect}>
          Estudiantes
        </button>
        <button style={style.button} className={` hover:text-white hover:bg-purple-600 hover:border-transparent ${className.admins.className}`} name="loginType" value="admins" onClick={handleSelect}>
          Administracion
        </button>
      </div>


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
        name="identifier"
        placeholder="Numero de cuenta"
        onChange={handleChange}
      />

      <input
        className="mt-3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/5"
        id="password"
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />

      <button
        className="px-4 py-1 w-3/5 text-sm text-purple-600 font-semibold rounded-md border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none    mt-5 "
        onClick={handleSubmit}
      >
        Iniciar sesion
      </button>
    </form>
  );
};

export default LoginForm;
