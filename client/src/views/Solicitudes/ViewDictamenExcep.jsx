import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../store/ContextExample";

const ViewDictamenExcep = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [listRequest, setListRequest] = useState([]);

  useEffect(() => {
    const getListRequest = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios(
          `http://localhost:3000/registro/request/getMyDictamenExceptionalCancellation/${state.user.ID_USER}`,
          config
        );
        setListRequest(response.data.request);
        console.log(response.data.request);
      } catch (error) {
        console.log(error);
      }
    };
    getListRequest();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  console.log("DICTAMEN EXCEPCIONAL", listRequest);

  return (
    <div className="container mx-auto mt-10">
      <div className="mt-5 text-center">
        <p className="text-red-800 text-lg font-bold">
          DICTAMEN DE LA SOLICITUD DE CAMBIO DE CENTRO
        </p>
      </div>
      {listRequest.length > 0 ? (
        <div className="w-3/5 mx-auto bg-gray-200 shadow rounded-md p-2 mt-3">
          {listRequest.map((request) => (
            <div className="bg-white p-2 mt-3 shadow rounded-md">
              <div className="mt-2 block">
                <p className="text-gray-800 font-bold text-md">
                  ID SOLICITUD:{" "}
                  <span className="font-semibold">
                    {request.ID_REQUEST}
                    {Date.now()}
                  </span>
                </p>
                <p className="text-gray-800 font-bold text-md uppercase mt-2">
                  Fecha del Dictamen:{" "}
                  <span className="font-semibold">
                    {formatDate(request.updatedAt)}
                  </span>
                </p>
              </div>
              <div className="mt-3">
                <p className="text-gray-800 font-bold text-md uppercase">
                  dictamen:{" "}
                  <span className="text-red-800 font-semibold">
                    {request.STATE}
                  </span>
                </p>
              </div>
              <div className="mt-3">
                <p className="text-red-800 text-md font-bold uppercase">
                  fundamentacion :
                </p>
                <div className="mt-2">
                  <p className="text-gray-800 text-md font-bold">
                    {request.OBS}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 text-center">
          <p className="text-xl text-red-800 font-bold">
            Lista de Dictamen Vacia
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewDictamenExcep;
