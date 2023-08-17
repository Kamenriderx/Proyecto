import { useContext, useState } from "react";
import { StoreContext } from "../../../store/ContextExample";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import AlertTwo from "../../../components/AlertTwo";

const ModalSeccionEspera = ({
  isOpen,
  onClose,
  seccionEspera,
  enviarDatoAlPadre,
}) => {
  if (!isOpen) {
    return null;
  }

  //contexto de usuario
  const { state } = useContext(StoreContext);

  //Data
  const [datos, setDatos] = useState({ tipo: "seccionEspera" });
  // console.log("Enviar datos: ", datos.seccion);
  // console.log("seccionEsperaSeleccionada: ", seccionEspera.seccion);
  //alerta
  const [alerta, setAlerta] = useState({});
  const [message1, setMessage1] = useState(false);

  //Enviar datos a componente Padre: TablaMatricula
  //MATRICULAR SECCION EN ESPERA
  const handleClick = async () => {
    setMessage1(false);

    //Validacion Seccion en espera
    if (datos.seccion === undefined) {
      setMessage1(true);
      setAlerta({
        message:"Para matricular la clase en lista de espera, debe seleccionar la sección.",
        error: true,
      });
      return;
    }

    try {
      const res = await httpRequests()["post"](
        `http://localhost:3000/registro/enrollment/inscriptionCourseWait/${state.user.ID_USER}`,
        { body: { ID_SECTION: datos.seccion.ID_SECTION } }
      );

      if (res?.status === 200) {
        setMessage1(true);
        setAlerta({
          message: "Clase matriculada exitosamente en lista de espera.",
          error: false,
        });
        return;
      }
      if (res?.response.status !== 200) {
        setMessage1(true);
            setAlerta({
              message: res.response.data.messagge,
              error: true,
            });
            return;
      }
    } catch (error) {
      console.log(error);
    }

    enviarDatoAlPadre("espera");
    onClose();
  };

  return (
    <>
      {message1 && (
        <>
          <AlertTwo alerta={alerta} />
        </>
      )}
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <div className="mb-4 font-bold text-lg">
          Sección llena ¿Matricular en espera?
        </div>
        <div className="mb-4">
          <select
            size="2"
            className="bg-gray-50 text-gray-900 text-md w-full border-none focus:border-none focus:ring-0"
          >
            <option
              onClick={() =>
                setDatos({ ...datos, seccion: seccionEspera.seccion })
              }
              value={seccionEspera.seccion.ID_SECTION}
            >
              {seccionEspera.seccion.SECTION_CODE}-{seccionEspera.seccion.DAYS}
            </option>
          </select>
        </div>

        <div className="flex justify-between gap-2">
          <button
            onClick={handleClick}
            className="p-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
          >
            Matricular
          </button>

          <button
            onClick={onClose}
            className="p-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ModalSeccionEspera;
