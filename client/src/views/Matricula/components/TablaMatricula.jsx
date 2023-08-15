import { useContext, useEffect, useState } from "react";
import ModalCancelarClase from "./ModalCancelarClase";
import ModalMatricula from "./ModalMatricula";
import ModalSeccionEspera from "./ModalSeccionEspera";
import { StoreContext } from "../../../store/ContextExample";
import { httpRequests } from "../../../utils/helpers/httpRequests";

const TablaMatricula = ({ cancelar, adicionar, form03 }) => {
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

      console.log("GET_CLASES_MATRICULADAS: ", res.data);
      setDataClasesMatriculadas(res.data);

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

      console.log("GET_CLASES_ESPERA: ", res.data);
      setDataClasesEnEspera(res.data);

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
  }, [state]);



  ////////////////////////////////////////////////////////////
  const dataClases = [
    {
      COD: "1",
      ASIGNATURA: "202020",
      SECCIÓN: "agua",
      HI: "ahaajj",
      HF: "cu",
      DIAS: "202020",
      UV: "agua",
      OBS: "ahaajj",
      PERIODO: "2",
    },
    {
      COD: "2",
      ASIGNATURA: "202020",
      SECCIÓN: "agua",
      HI: "ahaajj",
      HF: "cu",
      DIAS: "202020",
      UV: "agua",
      OBS: "ahaajj",
      PERIODO: "2",
    },
  ];

  const [data, setData] = useState(dataClases);

  //Clase en espera para eliminar
  const [selectedRow, setSelectedRow] = useState(null);
  //Habilitar el boton
  const [enableButton, setEnableButton] = useState(true);
  const [indexRowSelected, setindexRowSelected] = useState(null);
  // console.log("indexRowSelected: ", indexRowSelected);
    console.log("selectedRow: ", selectedRow);


  const handleRowClick = (index) => {
    setSelectedRow(index);
    setEnableButton(false);
    setindexRowSelected(index);
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

  //datos recibidos
  const [datosRecibidos, setDatosRecibidos] = useState(null)

  //Recibir datos de Ventanas Modales
  const recibirDatoDelHijo = async (datos) => {
    setDatosRecibidos(datos)
    console.log("tipo de dato: ", typeof datos);
    console.log("dato recibido: ", datos);

    //Cancelar clase
    if (datos === true) {

        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.token}`,
            },
          };
    
          const res = await httpRequests()["del"](
            `http://localhost:3000/registro/enrollment/canceledInscription/idCourse`,
            { ...config }
          );
    
          console.log("Clase cancelada: ");
          
          if (res?.status === 200) {
            alert("Clase cancelada exitosamente.");
            return;
          }
    
          if (!res.status && res?.response?.status !== 200) {
            throw new Error(res.response.data.messagge);
          }
        } catch (error) {
          console.log(error);
        }
      



      const nuevasClases = [...data];
      nuevasClases.splice(indexRowSelected, 1);
      setData(nuevasClases);
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
        alert(
          "Para matricular una clase debe seleccionar área, clase y sección."
        );
        return;
      }
      if (datos.seccion.SPACE_AVAILABLE == 0) {
        //seccion en espera
        openModalSeccionEspera();
      } else {
        //matricular clase
        try {
          const res = await httpRequests()["post"](
            `http://localhost:3000/registro/enrollment/inscriptionCourse/${state.user.ID_USER}`,
            { body: data }
          );
          console.log("Clase matriculada");

          if (res?.status === 200) {
            alert("Clase matriculada exitosamente.");
            return;
          }
          if (res?.response.status !== 200) {
            throw new Error(res.response.data.messagge);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

  };

  return (
    <>
      {adicionar && !form03 && (
        <button
          className="mb-4 py-3 px-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
          onClick={openModal}
        >
          Adicionar Asignatura
        </button>
      )}
      <div className="relative overflow-x-auto rounded-xl">
        <table className="w-full text-lg text-left text-gray-700">
          <thead className="text-xl text-black uppercase bg-gray-200">
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
                    OBS
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PERIODO
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((arr, index) => (
              <tr
                key={arr.COD}
                className={`${
                  cancelar
                    ? selectedRow === index
                      ? "bg-sky-400 cursor-pointer"
                      : "hover:bg-sky-200 cursor-pointer"
                    : ""
                }`}
                onClick={() => handleRowClick(index)}
              >
                <td className="px-6 py-4">{arr.COD}</td>
                <td className="px-6 py-4">{arr.ASIGNATURA}</td>
                <td className="px-6 py-4">{arr.SECCIÓN}</td>
                <td className="px-6 py-4">{arr.HI}</td>
                <td className="px-6 py-4">{arr.HF}</td>
                <td className="px-6 py-4">{arr.DIAS}</td>
                <td className="px-6 py-4">{arr.UV}</td>
                {adicionar && (
                  <>
                    <td className="px-6 py-4">{arr.OBS}</td>
                    <td className="px-6 py-4">{arr.PERIODO}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {cancelar && (
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
          seccionEspera = {datosRecibidos}
        />
      </div>
    </>
  );
};

export default TablaMatricula;
