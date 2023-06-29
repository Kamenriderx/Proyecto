import { useState } from "react";
import LoginForm from "./components/Login";
import ConfirmAccountForm from "./components/ConfirmAccountForm";

function Auth() {
  const [login, setLogin] = useState(false);
  const [awaitedLogin, setAwaitedLogin] = useState(login);
  const [animation, setAnimation] = useState(false);

  const setAnimations = () => {
    setAwaitedLogin(login);
    setAnimation(false);
  };

  const awaitAnimation = () => {
    setTimeout(setAnimations, 300);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent:"center",
        width: "100%",
        height: "400px",
        
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "350px",
          width: "65%",
        }}
      >
        {
            /*
            
            <p
              style={{
                transition: "color 1s",
                position: "absolute",
                fontWeight: "bolder",
                top: "110px",
                left: "270px",
                zIndex:"20"
              }}
              className={`${login ? "text-white" : "text-black"} transition`}
            >
              East High
            </p>
            
            */ 
        }
        <div
          style={{
            transition: "left 1s",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignContent: "center",
            width: "60%",
            height: "350px",
            overflow: "hidden",
            position: "relative",
            backgroundColor:"black",
            padding:"0px 20px 0 20px",
            borderRadius:"10px"
            
          }}
          className={`
      ${login ? " animate__fadeInRight" : "animate__fadeInLeft"} 
      `}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height:"150px",
              justifyContent: "center",
              alignContent: "center",
              overflow: "hidden",
              color:"white"
            }}
            className={`animate__animated ${
              login ? "animate__fadeInRight" : "animate__fadeInLeft"
            }`}
          >
            
            <h3
              style={{
                textAlign: "center",
              }}
            >
              {login ? "Bienvenido" : "¿Olvidaste tu contraseña?"}
            </h3>
            <p
              style={{
                textAlign: "center",
              }}
            >
              {login
                ? "Por favor ingresa tus datos e inicia sesión!"
                : "Ingresa tu numero de cuenta para recuperarla!"}
            </p>
          </div>

          <button
            onClick={() => {
              setLogin(!login);
              setAnimation(true);
              awaitAnimation();
            }}

            style={{
                borderRadius:"10px",
                border:"2px solid white",
                
                
            }}
          >
            <p
              className={`animate__animated animate__fadeInLeft ${
                login ? "animate__fadeInLeft" : "animate__fadeInRight"
              }`}
              style={{
                display:"inline-flex",
                justifyContent:"center",
                alignItems:"center",
                width: "50%",
                height:"50px",
                fontFamily: "sans-serif",
                color:"white",
              }}
            >
              {login ? "Recuperar" : "Iniciar"}
            </p>
          </button>
        </div>
        <div
          style={{
            transition: "left 1s",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
            height: "350px",
          }}
          className={` ${login ? "right-1/3" : "right-0"}`}
        >
          {/* <div
            style={{
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
            className={`animate__animated ${login?"animate__fadeIn":"animate__fadeIn"}`}
          >
            <h2
              style={{
                fontFamily: "sans-serif",
                display: "inline-block",
                textAlign: "center",
              }}
              
            >
              {!awaitedLogin ? "Portal East Higth" : "Recuperar contraseña"}
            </h2>
          </div> */}

          <div
            style={{
              height: "300px",
              width:"100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {!awaitedLogin ? <LoginForm /> : <ConfirmAccountForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
