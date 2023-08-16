import DatosEstudiante from "./components/DatosEstudiante";
import TablaMatricula from "./components/TablaMatricula";

const CancelarClaseEnEspera = () => {
  return (
    <div className="mx-16 mt-32 ">
      <DatosEstudiante />
      <TablaMatricula cancelarClaseEspera={true} cancelarClaseMatriculada={false} adicionar={false} form03={false}/>
    </div>
  );
};

export default CancelarClaseEnEspera;
