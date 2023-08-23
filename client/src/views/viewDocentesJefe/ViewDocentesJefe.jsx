import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../store/ContextExample";
import { Link } from "react-router-dom";
const ViewDocentesJefe = () => {
  const { state } = useContext(StoreContext);
  const [maestros, setMaestros] = useState([]);
  useEffect(() => {
    const getDocentesJefe = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        if (!token) return;
        const response = await axios(
          `http://localhost:3000/registro/headOfDepartment/getProffessorsCarrer/${state.user.ID_USER}`,
          config
        );
        setMaestros(response.data.professors);
        console.log("MAESTROS", response.data.professors);
      } catch (error) {
        console.log(error);
      }
    };
    getDocentesJefe();
  }, []);
  console.log("MAESTROS ESTADO", maestros);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="mt-10">
          <p className="text-gray-800 text-3xl font-black">
            Ver Calificaciones de Maestros
          </p>
        </div>
      </div>
      <div className="mt-5">
        <div className="mt-10">
          {maestros?.length > 0 ? (
            <>
              <table className="w-full bg-white shadow-md table-auto">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="p-2">Carrera</th>
                    <th className="p-2">Correo Institucional</th>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Numero de Cuenta</th>
                    <th className="p-2">Centro</th>
                    <th className="p-2">Ver Clases Asignadas</th>
                  </tr>
                </thead>
                <tbody>
                  {maestros.map((master) => (
                    <tr className="border-b" key={master.ID_PROFFERSSOR}>
                      <td className="border px-4 py-2 text-sm font-medium r">
                        {master.CAREER}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {master.INSTITUTIONAL_EMAIL}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {master.user.NAME}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {master.user.ACCOUNT_NUMBER}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        {master.user.CENTER}
                      </td>
                      <td className="text-center border px-4 py-2 text-sm font-medium r">
                        <Link to={`/seccionesmatriculadas/${master.ID_USER}`}>
                          <p className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer">
                            Ver Secciones
                          </p>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-2xl text-center uppercase font-bold ">
              No se encontraron clases asignadas
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDocentesJefe;
