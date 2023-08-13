import DatosEstudiante from "./components/DatosEstudiante";
import TablaMatricula from "./components/TablaMatricula";

const CancelarClase = () => {
  return (
    <div className="mx-16 mt-32 ">
      <DatosEstudiante />
      <TablaMatricula cancelar={true} adicionar={false} form03={false}/>
    </div>
  );
};

export default CancelarClase;
