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
        justifyContent: "flex-start",
        alignContent: "flex-start",
        width: "100%",
        height: "400px",
        marginTop: "130px",
        //backgroundImage:"../../asset/auth_background.jpg"
      }}
    >
      <LoginForm/>
      
         
    </div>
  );
}

export default Auth;
