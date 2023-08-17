import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../store/ContextExample";
import { httpRequests } from "../../../utils/helpers/httpRequests";

const DatosEstudiante = ({check}) => {

    //contexto de usuario
    const { state } = useContext(StoreContext);

    const [dataStudent, setdataStudent] = useState(null)

  const getStudent = async (stateUser) => {
    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/enrollment/infoStudent/${stateUser.user.ID_USER}`,
        { ...config }
      );

      // console.log('GET_STUDENT: ',res.data)
      setdataStudent(res.data)

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent(state);
  }, [state, check]);


  return (
    <>
    {dataStudent && (
      <div className="grid grid-cols-4 gap-4 p-4  border border-black bg-gray-200 mb-10 rounded-xl">
        <div>
          <p className="font-bold text-xl">Nombre</p>
          <p className="text-gray-700 text-lg">{dataStudent.name}</p>
        </div>
        <div>
          <p className="font-bold text-xl">Índice de periodo</p>
          <p className="text-gray-700 text-lg">{dataStudent.indexAcademicPeriod}</p>
        </div>
        <div>
          <p className="font-bold text-xl">Centro</p>
          <p className="text-gray-700 text-lg">{dataStudent.center}</p>
        </div>
        <div>
          <p className="font-bold text-xl">Número de Cuenta</p>
          <p className="text-gray-700 text-lg">{dataStudent.accountNumber}</p>
        </div>
        <div>
          <p className="font-bold text-xl">Carrera</p>
          <p className="text-gray-700 text-lg">{dataStudent.career}</p>
        </div>
        <div>
          <p className="font-bold text-xl">Índice global</p>
          <p className="text-gray-700 text-lg">{dataStudent.indexAcademicGlobal}</p>
        </div>
        <div>
          <p className="font-bold text-xl">Año</p>
          <p className="text-gray-700 text-lg">{dataStudent.year}</p>
        </div>
        <div>
          <p className="font-bold text-xl">UV</p>
          <p className="text-gray-700 text-lg">{dataStudent.uvAvailabe}</p>
        </div>
      </div>
    )}
    </>
  );
};

export default DatosEstudiante;
