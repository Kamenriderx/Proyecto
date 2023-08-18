import TablaMatricula from "./components/TablaMatricula";
import DatosEstudiante from "./components/DatosEstudiante";
import { useState } from "react";

const AdicionarClase = () => {
  const [check, setCheck] = useState(null);
  const recibirDatoDelHijo = (datos) => {
    console.log("datos: ", datos);
    setCheck(datos);
  };

  return (
    <div className="mx-16 mt-32 ">
      <DatosEstudiante check={check}/>
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
