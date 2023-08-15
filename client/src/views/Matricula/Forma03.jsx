import { useContext, useEffect, useState } from "react";
import fondoPerfil from "../../../../client/src/assets/fondoPerfil.jpg";
import TablaMatricula from "./components/TablaMatricula";
import { StoreContext } from "../../store/ContextExample";
import { httpRequests } from "../../utils/helpers/httpRequests";

const Forma03 = () => {
  //contexto de usuario
  const { state } = useContext(StoreContext);

  const [dataStudent, setdataStudent] = useState(null);

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

      console.log("GET_STUDENT: ", res.data);
      setdataStudent(res.data);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent(state);
  }, [state]);

  return (
    <>
      <div className="mx-16 mt-32 ">
        {dataStudent && (
          <div className="flex justify-around space-y-5 p-4 border border-black bg-gray-200 mb-10 rounded-xl">
            <div >
              <img
                className="w-40 h-40 rounded-xl border border-black object-cover"
                src={fondoPerfil}
                alt="fondoPerfil"
              />
            </div>
            <div >
              <p className="font-bold text-xl">Nombre</p>
              <p className="text-gray-700 text-lg">{dataStudent.name}</p>
              <p className="font-bold text-xl">Número de Cuenta</p>
              <p className="text-gray-700 text-lg">{dataStudent.accountNumber}</p>
            </div>
            <div>
              <p className="font-bold text-xl">Centro</p>
              <p className="text-gray-700 text-lg">{dataStudent.center}</p>
              <p className="font-bold text-xl">Año</p>
              <p className="text-gray-700 text-lg">{dataStudent.year}</p>
            </div>
          </div>
        )}

        <TablaMatricula cancelar={false} adicionar={true} form03={true} />
      </div>
    </>
  );
};

export default Forma03;
