import DatosEstudiante from "./components/DatosEstudiante";
import TablaMatricula from "./components/TablaMatricula";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const CancelarClaseEnEspera = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
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
      <DatosEstudiante />
      <TablaMatricula
        cancelarClaseEspera={true}
        cancelarClaseMatriculada={false}
        adicionar={false}
        form03={false}
      />
    </div>
  );
};

export default CancelarClaseEnEspera;
