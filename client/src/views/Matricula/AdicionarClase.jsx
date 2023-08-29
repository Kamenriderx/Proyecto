import TablaMatricula from "./components/TablaMatricula";
import DatosEstudiante from "./components/DatosEstudiante";
import { useState } from "react";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const AdicionarClase = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [check, setCheck] = useState(null);
  const recibirDatoDelHijo = (datos) => {
    console.log("datos: ", datos);
    setCheck(datos);
  };

  return (
    <div className="mx-16 mt-32 ">
      <div className="flex justify-start mx-5 mb-5">
        <div className="mt-5">
          <button
            onClick={handleBack}
            className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
          >
            <BiArrowBack color="#F7F9F7" size={20} />
          </button>
        </div>
      </div>
      <DatosEstudiante check={check} />
      <TablaMatricula
        adicionar={true}
        cancelarClaseMatriculada={false}
        cancelarClaseEspera={false}
        form03={false}
        enviarDatoAlPadre={recibirDatoDelHijo}
      />
    </div>
  );
};

export default AdicionarClase;
