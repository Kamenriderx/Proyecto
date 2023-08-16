import TablaMatricula from "./components/TablaMatricula";
import DatosEstudiante from "./components/DatosEstudiante";


const AdicionarClase = () => {

  return (
    <div className="mx-16 mt-32 ">
    <DatosEstudiante />
    <TablaMatricula adicionar={true} cancelarClaseMatriculada={false} cancelarClaseEspera={false} form03={false}/>
  </div>
  );
};

export default AdicionarClase;
