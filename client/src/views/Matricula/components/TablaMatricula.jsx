import { useContext, useEffect, useState } from "react";
import ModalCancelarClase from "./ModalCancelarClase";
import ModalMatricula from "./ModalMatricula";
import ModalSeccionEspera from "./ModalSeccionEspera";
import { StoreContext } from "../../../store/ContextExample";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import axios from "axios";
import AlertTwo from "../../../components/AlertTwo";
import DatosEstudiante from "./DatosEstudiante";

const TablaMatricula = ({
  cancelarClaseMatriculada,
  cancelarClaseEspera,
  adicionar,
  form03,
  enviarDatoAlPadre
}) => {
  //datos recibidos
  const [datosRecibidos, setDatosRecibidos] = useState(null);

  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);

  //contexto de usuario
  const { state } = useContext(StoreContext);

  //data de clases matriculadas
  const [dataClasesMatriculadas, setDataClasesMatriculadas] = useState(null);
  const getClasesMatriculadas = async (stateUser) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/enrollment/enrollmentCourses/${stateUser.user.ID_USER}`,
        { ...config }
      );

      // console.log("GET_CLASES_MATRICULADAS: ", res.data.courses);
      setDataClasesMatriculadas(res.data.courses);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //data de clases en espera
  const [dataClasesEnEspera, setDataClasesEnEspera] = useState(null);
  const getClasesEnEspera = async (stateUser) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/enrollment/waitingCourses/${stateUser.user.ID_USER}`,
        { ...config }
      );

      // console.log("GET_CLASES_ESPERA: ", res.data.courses);
      setDataClasesEnEspera(res.data.courses);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClasesMatriculadas(state);
    getClasesEnEspera(state);
  }, [state, check, check1]);

  ////////////////////////////////////////////////////////////
  const [alerta, setAlerta] = useState({});
  const [message1, setMessage1] = useState(false);

  //Clase en espera para eliminar
  const [selectedRow, setSelectedRow] = useState(null);
  //Habilitar el boton
  const [enableButton, setEnableButton] = useState(true);
  const [indexRowSelected, setindexRowSelected] = useState(null);
  const [idClaseCancelar, setidClaseCancelar] = useState(null);

  // console.log("indexRowSelected: ", indexRowSelected);
  // console.log("idClaseCancelar: ", idClaseCancelar);

  const handleRowClick = (index, iDEnrrolment) => {
    setSelectedRow(index);
    setEnableButton(false);
    setindexRowSelected(index);
    setidClaseCancelar(iDEnrrolment);
    // console.log('data row selected: ', data[index])
  };

  //ModalMatricular
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //ModalCancelarClase
  const [isModalOpenCancelarClase, setIsModalOpenCancelarClase] =
    useState(false);

  const openModalCancelarClase = () => {
    setIsModalOpenCancelarClase(true);
  };
  const closeModalCancelarClase = () => {
    setIsModalOpenCancelarClase(false);
  };

  //ModalSeccionEspera
  const [isModalOpenSeccionEspera, setIsModalOpenSeccionEspera] =
    useState(false);

  const openModalSeccionEspera = () => {
    setIsModalOpenSeccionEspera(true);
  };
  const closeModalSeccionEspera = () => {
    setIsModalOpenSeccionEspera(false);
  };


  const [check3, setCheck3] = useState(0)

  //Recibir datos de Ventanas Modales
  const recibirDatoDelHijo = async (datos) => {
    setCheck3(check3+1)
    setMessage1(false);
    setDatosRecibidos(datos);
    // console.log("tipo de dato: ", typeof datos);
    //console.log("dato recibido: ", datos.seccion.ID_SECTION);

    //Cancelar clase
    if (datos === true) {
      try {
        const res = await axios.post(
          `http://localhost:3000/registro/enrollment/canceledInscription/${idClaseCancelar}/${state.user.ID_USER}`
        );
        // console.log("Clase cancelada");
        setCheck1(!check1);

        if (res?.status === 200) {
          setMessage1(true);
          setAlerta({
            message: "Clase cancelada exitosamente.",
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
      return;
    }
    //Adicionar clase
    // r1.hasOwnProperty("base")
    if (datos.tipo === "matricula") {
      if (
        datos.area === undefined ||
        datos.clase === undefined ||
        datos.seccion === undefined
      ) {
        setMessage1(true);
        setAlerta({
          message:
            "Para matricular una clase debe seleccionar área, clase y sección.",
          error: true,
        });
        return;
      }
      if (datos.seccion.SPACE_AVAILABLE == 0) {
        //seccion en espera
        openModalSeccionEspera();
        handleClick()
      } else {
        // matricular clase
        try {
          const res = await httpRequests()["post"](
            `http://localhost:3000/registro/enrollment/inscriptionCourse/${state.user.ID_USER}`,
            { body: { ID_SECTION: datos.seccion.ID_SECTION } }
          );
          // console.log("Clase matriculada:", res);
          setCheck(!check);

          if (res?.status === 200) {
            setMessage1(true);
            setAlerta({
              message: "Clase matriculada exitosamente.",
              error: false,
            });
            handleClick()
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
      }
    }
  };
    // Enviar datos a componente Padre: Adicionar Clase
    const handleClick = () => {
      enviarDatoAlPadre(check3);
    };
  return (
    <>
      {message1 && (
        <>
          <AlertTwo alerta={alerta} />
        </>
      )}
      {adicionar && !form03 && (
        <button
          className="mb-4 py-3 px-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
          onClick={openModal}
        >
          Adicionar Asignatura
        </button>
      )}
      <div className="relative overflow-x-auto rounded-xl">
        <table className="w-full text-lg text-left text-gray-700 ">
          <thead className="text-xl text-black uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                CÓDIGO
              </th>
              <th scope="col" className="px-6 py-3">
                ASIGNATURA
              </th>
              <th scope="col" className="px-6 py-3">
                SECCIÓN
              </th>
              <th scope="col" className="px-6 py-3">
                HI
              </th>
              <th scope="col" className="px-6 py-3">
                HF
              </th>
              <th scope="col" className="px-6 py-3">
                DIAS
              </th>
              <th scope="col" className="px-6 py-3">
                UV
              </th>
              {adicionar && (
                <>
                  <th scope="col" className="px-6 py-3">
                    PERIODO
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {adicionar && (
              <>
                {dataClasesMatriculadas && (
                  <>
                    {dataClasesMatriculadas.map((arr, index) => (
                      <tr
                        key={arr.ID_ENROLLMENT}
                        className={`${
                          cancelarClaseEspera
                            ? selectedRow === index
                              ? "bg-sky-400 cursor-pointer"
                              : "hover:bg-sky-200 cursor-pointer"
                            : ""
                        }`}
                        onClick={() => handleRowClick(index, arr.ID_ENROLLMENT)}
                      >
                        <td className="px-6 py-4">
                          {arr.seccion.course.CODE_COURSE}
                        </td>
                        <td className="px-6 py-4">{arr.seccion.course.NAME}</td>
                        <td className="px-6 py-4">
                          {arr.seccion.SECTION_CODE}
                        </td>
                        <td className="px-6 py-4">{arr.seccion.START_TIME}</td>
                        <td className="px-6 py-4">{arr.seccion.END_TIME}</td>
                        <td className="px-6 py-4">{arr.seccion.DAYS}</td>
                        <td className="px-6 py-4">{arr.seccion.course.UV}</td>
                        {adicionar && (
                          <>
                            <td className="px-6 py-4">
                              {arr.seccion.period.PERIOD_NAME}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </>
                )}
              </>
            )}

            {cancelarClaseMatriculada && (
              <>
                {dataClasesMatriculadas && (
                  <>
                    {dataClasesMatriculadas.map((arr, index) => (
                      <tr
                        key={arr.ID_ENROLLMENT}
                        className={`${
                          cancelarClaseMatriculada
                            ? selectedRow === index
                              ? "bg-sky-400 cursor-pointer"
                              : "hover:bg-sky-200 cursor-pointer"
                            : ""
                        }`}
                        onClick={() => handleRowClick(index, arr.ID_ENROLLMENT)}
                      >
                        <td className="px-6 py-4">
                          {arr.seccion.course.CODE_COURSE}
                        </td>
                        <td className="px-6 py-4">{arr.seccion.course.NAME}</td>
                        <td className="px-6 py-4">
                          {arr.seccion.SECTION_CODE}
                        </td>
                        <td className="px-6 py-4">{arr.seccion.START_TIME}</td>
                        <td className="px-6 py-4">{arr.seccion.END_TIME}</td>
                        <td className="px-6 py-4">{arr.seccion.DAYS}</td>
                        <td className="px-6 py-4">{arr.seccion.course.UV}</td>
                        {adicionar && (
                          <>
                            <td className="px-6 py-4">
                              {arr.seccion.period.PERIOD_NAME}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </>
                )}
              </>
            )}

            {cancelarClaseEspera && (
              <>
                {dataClasesEnEspera && (
                  <>
                    {dataClasesEnEspera.map((arr, index) => (
                      <tr
                        key={arr.ID_ENROLLMENT}
                        className={`${
                          cancelarClaseEspera
                            ? selectedRow === index
                              ? "bg-sky-400 cursor-pointer"
                              : "hover:bg-sky-200 cursor-pointer"
                            : ""
                        }`}
                        onClick={() => handleRowClick(index, arr.ID_ENROLLMENT)}
                      >
                        <td className="px-6 py-4">
                          {arr.seccion.course.CODE_COURSE}
                        </td>
                        <td className="px-6 py-4">{arr.seccion.course.NAME}</td>
                        <td className="px-6 py-4">
                          {arr.seccion.SECTION_CODE}
                        </td>
                        <td className="px-6 py-4">{arr.seccion.START_TIME}</td>
                        <td className="px-6 py-4">{arr.seccion.END_TIME}</td>
                        <td className="px-6 py-4">{arr.seccion.DAYS}</td>
                        <td className="px-6 py-4">{arr.seccion.course.UV}</td>
                        {adicionar && (
                          <>
                            <td className="px-6 py-4">
                              {arr.seccion.period.PERIOD_NAME}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div>
        {(cancelarClaseEspera || cancelarClaseMatriculada) && (
            <button
              disabled={enableButton}
              onClick={openModalCancelarClase}
              className="my-4 py-3 px-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded float-right disabled:bg-gray-400"
            >
              Cancelar Asignatura
            </button>
          )}
        <ModalCancelarClase
          isOpen={isModalOpenCancelarClase}
          onClose={closeModalCancelarClase}
          enviarDatoAlPadre={recibirDatoDelHijo}
        />
        <ModalMatricula
          isOpen={isModalOpen}
          onClose={closeModal}
          enviarDatoAlPadre={recibirDatoDelHijo}
        />
        <ModalSeccionEspera
          isOpen={isModalOpenSeccionEspera}
          onClose={closeModalSeccionEspera}
          enviarDatoAlPadre={recibirDatoDelHijo}
          seccionEspera={datosRecibidos}
        />
      </div>
    </>
  );
};

export default TablaMatricula;
