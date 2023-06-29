import { GiLynxHead } from "react-icons/gi";
import { useContext, useState } from "react";
import { httpRequests } from "../../../utils/helpers/httpRequests"; 
import { useNavigate } from "react-router";
import { StoreContext } from "../../../store/ContextExample";

const LoginForm = () => {

  const navigate = useNavigate();
  const [login, setLogin] = useState({
    password: "",
    identifier: "",
    loginType:"student"
  });
  const { state, dispatch } = useContext(StoreContext);

  

  const handleChange = (e) => {
    e.preventDefault();
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
    
    console.log(login);
    let url = ""; 
    if(login.loginType === "admin"){
      url = "http://localhost:3000/registro/login/admins"; 
    }else if(login.loginType ==="student"){
      url = "http://localhost:3000/registro/login/students"; 
    }else if(login.loginType ==="proffessor"){
      url = "http://localhost:3000/registro/login/professors"; 
      
    }
    
    const res = await httpRequests()["post"](url,{body:{...login}});
    
    // console.log(login.password, login.password);
    // if (
    //   !passwordRe.test(login.password) &&
    //   !accountRe.test(login.password)
    // ) {
    //   alert("Sus credenciales de sesión son incorrectas");
    // }
    if(res.status===200){
      console.log(res.data.user);
      const token = res.data.token;
      localStorage.setItem("token",token);
      console.log(token);
      dispatch({type:"USER",user:res.data.user});
      dispatch({type:"TOKEN",token:res.data.token});
      dispatch({type:"LOGIN"});
      navigate(`/perfil`);

    }else{
      alert("Error en las credenciales de sesion");
    }
    
  };
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
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        marginBottom:"20px"

      }}>
        <button style={{
        border:"1px solid black",
        borderRadius:"20px",
        width:"100px",
        cursor:"pointer"
      }}
      name="loginType"
      value="proffessor"
      onClick={handleChange}

      >Profesores</button>
      <button style={{
        border:"1px solid black",
        borderRadius:"20px",
        width:"100px",
        cursor:"pointer"
      }}
      name="loginType"
      value="student"
      onClick={handleChange}
      >Estudiantes</button>
      <button style={{
        border:"1px solid black",
        borderRadius:"20px",
        width:"120px",
        cursor:"pointer"
      }}
      name="loginType"
      value="admin"
      onClick={handleChange}
      >Administracion</button>
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
        className="px-4 py-1 w-3/5 text-sm text-purple-600 font-semibold rounded-md border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2  mt-5 "
        onClick={handleSubmit}
      >
        Iniciar sesion
      </button>
    </form>
  );
};

export default LoginForm;
