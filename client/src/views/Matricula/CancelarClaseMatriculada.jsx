import DatosEstudiante from "./components/DatosEstudiante";
import TablaMatricula from "./components/TablaMatricula";

const CancelarClaseMatriculada = () => {
  return (
    <div className="mx-16 mt-32 ">
      <DatosEstudiante />
      <TablaMatricula cancelarClaseMatriculada={true} cancelarClaseEspera={false}  adicionar={false} form03={false}/>
    </div>
  );
};

export default CancelarClaseMatriculada;
