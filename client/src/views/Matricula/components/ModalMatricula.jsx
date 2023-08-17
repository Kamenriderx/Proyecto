import { useContext, useEffect, useState } from "react";
import AlertThree from "../../../components/AlertThree";
import { StoreContext } from "../../../store/ContextExample";
import { httpRequests } from "../../../utils/helpers/httpRequests";

const ModalMatricula = ({ isOpen, onClose, enviarDatoAlPadre }) => {
  if (!isOpen) {
    return null;
  }
 
  //Data area
  const [area, setArea] = useState({ tipo: "area" });
  //Data calse
  const [clase, setClase] = useState({ tipo: "clase" });
  //Data seccion
  const [seccion, setSeccion] = useState({ tipo: "seccion" });
  //Data 
  const [datos, setDatos] = useState({ tipo: "matricula" });

  // console.log("area: ", area);
  // console.log("clase: ", clase);
  // console.log("seccion: ", seccion);

  // console.log('area: ',datos.area, " ", 'clase: ', datos.clase, " ",'seccion: ', datos.seccion);

  //contexto de usuario
  const { state } = useContext(StoreContext);

  //data de area
  const [dataArea, setDataArea] = useState(null);
  
  const getArea = async (stateUser) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/enrollment/listAreas/${stateUser.user.ID_USER}`,
        { ...config }
      );

      // console.log("GET_AREA: ", res.data.areas);
      setDataArea(res.data.areas);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //data de clase
  const [dataClase, setDataclase] = useState(null);

  const getClase = async (stateUser) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/enrollment/listCoursesArea/${area.idArea}/${stateUser.user.ID_USER}`,
        { ...config }
      );

      // console.log("GET_CLASE: ", res.data.courses);
      setDataclase(res.data.courses);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //data de seccion
  const [dataSeccion, setDataseccion] = useState(null);

  const getSeccion = async (stateUser) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/enrollment/getCourseSections/${clase.idClase}`,
        { ...config }
      );

      // console.log("GET_SECCION: ", res.data.sections);
      setDataseccion(res.data.sections);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArea(state);
    getClase(state);
    getSeccion(state);

    setDatos({...datos, matricula:"matricula" })
  }, [state, area, clase]);

  /////////////////////////

  //Alerta
  const [message, setMessage] = useState(false);
  const [alerta, setAlerta] = useState();

  //Enviar datos a componente Padre: TablaMatricula
  const handleClick = () => {
    enviarDatoAlPadre(datos);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <table className="text-lg text-left text-gray-700 border border-black mb-4">
            <thead className="text-xl text-black uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ÁREA
                </th>
                <th scope="col" className="px-6 py-3">
                  CLASE
                </th>
                <th scope="col" className="px-6 py-3">
                  SECCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-60">
                  {dataArea && (
                    <select
                      onChange={(event) =>
                        setArea({ ...area, idArea: event.target.value })
                      }
                      size="8"
                      className="bg-gray-50 text-gray-900 text-md w-full border-none focus:border-none focus:ring-0"
                    >
                      {dataArea.map((area) => (
                        <option onClick={() => setDatos({...datos, area: area})} value={area.ID_CAREER} key={area.ID_CAREER}>
                          {area.NAME}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td className="w-72">
                  {dataClase && (
                    <select
                      onChange={(event) =>
                        setClase({ ...clase, idClase: event.target.value })
                      }
                      size="8"
                      className="bg-gray-50 text-gray-900 text-md w-full border-none focus:border-none focus:ring-0"
                    >
                      {dataClase.map((clase) => (
                        <option onClick={() => setDatos({...datos, clase: clase})} value={clase.ID_COURSE} key={clase.ID_COURSE}>
                          {clase.NAME}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td className="w-72">
                  {dataSeccion && (
                    <select
                      onChange={(event) =>
                        setSeccion({
                          ...seccion,
                          idSeccion: event.target.value,
                        })
                      }
                      size="8"
                      className="bg-gray-50 text-gray-900 text-md w-full border-none focus:border-none focus:ring-0"
                    >
                      {dataSeccion.map((seccion) => (
                        <option
                        onClick={() => setDatos({...datos, seccion: seccion})}
                          value={seccion.ID_SECTION}
                          key={seccion.ID_SECTION}
                        >
                          {seccion.START_TIME}-{seccion.DAYS} - {seccion.SPACE_AVAILABLE} Cupos disponibles
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleClick}
                className="p-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
              >
                Adicionar
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
      </div>
      {message && (
        <>
          <AlertThree alerta={alerta} />
        </>
      )}
    </>
  );
};

export default ModalMatricula;
