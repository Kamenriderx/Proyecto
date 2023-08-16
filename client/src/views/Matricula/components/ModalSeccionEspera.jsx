import { useContext, useState } from "react";
import { StoreContext } from "../../../store/ContextExample";
import { httpRequests } from "../../../utils/helpers/httpRequests";

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
  console.log("Enviar datos: ", datos.seccion);
  console.log("seccionEsperaSeleccionada: ", seccionEspera.seccion);

  //Enviar datos a componente Padre: TablaMatricula
  //MATRICULAR SECCION EN ESPERA
  const handleClick = async () => {
    //Validacion Seccion en espera
    if (datos.seccion === undefined) {
      alert("Debe de seleccionar una sección.");
      return;
    }

    try {
      const res = await httpRequests()["post"](
        `http://localhost:3000/registro/enrollment/inscriptionCourseWait/${state.user.ID_USER}`,
        { body: { ID_SECTION: datos.seccion.ID_SECTION } }
      );

      if (res?.status === 200) {
        alert("Clase matriculada exitosamente en lista de espera.");
      }
      if (res?.response.status !== 200) {
        alert(res.response.data.messagge);
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }

    enviarDatoAlPadre("espera");
    onClose();
  };

  return (
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
  );
};

export default ModalSeccionEspera;
