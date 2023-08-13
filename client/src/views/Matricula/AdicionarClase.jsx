import TablaMatricula from "./components/TablaMatricula";
import DatosEstudiante from "./components/DatosEstudiante";


const AdicionarClase = () => {

  return (
    <div className="mx-16 mt-32 ">
    <DatosEstudiante />
    <TablaMatricula cancelar={false} adicionar={true} form03={false}/>
  </div>
  );
};

export default AdicionarClase;
