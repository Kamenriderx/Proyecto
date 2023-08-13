import { useState } from "react";
import ModalCancelarClase from "./ModalCancelarClase";
import ModalMatricula from "./ModalMatricula";
import ModalSeccionEspera from "./ModalSeccionEspera";

const TablaMatricula = ({ cancelar, adicionar, form03 }) => {
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

  //Seleccionar una fila de la tabla
  const [selectedRow, setSelectedRow] = useState(null);
  //Habilitar el boton
  const [enableButton, setEnableButton] = useState(true);
  const [indexRowSelected, setindexRowSelected] = useState(null);
  // console.log("indexRowSelected: ", indexRowSelected);

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

  //Recibir datos de Ventanas Modales
  const recibirDatoDelHijo = (datos) => {
    console.log("tipo de dato: ", typeof datos);
    console.log("dato recibido: ", datos);

    //Cancelar clase
    if (datos === true) {
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
      } else {
        // alert("Clase matriculada exitosamente.");
        openModalSeccionEspera();
      }
    }
    //Validacion Seccion en espera
    if (datos.tipo === "seccionEspera") {
      if (datos.seccion === undefined) {
        alert("Debe de seleccionar una sección.");
        return;
      } 
    }
  };

  return (
    <>
      {(adicionar && !form03) && (
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
        />
      </div>
    </>
  );
};

export default TablaMatricula;
