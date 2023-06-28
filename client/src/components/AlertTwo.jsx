import Swal from "sweetalert2";

const AlertTwo = ({ alerta }) => {
  const {title, text, icon} = alerta

  const ReceivedAlert = () => {
    Swal.fire({
      position: "center",
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "Aceptar",
    });
    console.log(alerta);
  };

  return ReceivedAlert();
};

export default AlertTwo;
