import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../../../store/ContextExample";
import Spinner2 from "../../../components/Spinner2";
import { AiFillDelete } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";
import fondoPerfil from "../../../assets/fondoPerfil.jpg";

const ListContacts = () => {
  const [listContacts, setListContacts] = useState([]);
  const { state, dispatch } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getContacts = async () => {
      setLoading(true);
      try {
        const { data } = await axios(
          `http://localhost:3000/registro/contacts/${state.user.ID_USER}`
        );
        setListContacts(data.contacts);
        console.log(data.contacts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/registro/contacts/deleteContact/${state.user.ID_USER}/${id}`
      );
      console.log(response.data);
      setListContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.ID_USER !== id)
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  console.log("LIST CONTACT", listContacts);

  if (loading) return <Spinner2 />;
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-start mx-10">
          <div className="mt-5">
            <button
              onClick={handleBack}
              className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
            >
              <BiArrowBack color="#F7F9F7" size={20} />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mt-10 text-center">
            <p className="text-4xl text-sky-700 font-black flex items-center gap-5">
              Mis Contactos <IoIosContact size={60} />
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mt-10">
            {listContacts?.length > 0 ? (
              <>
                <table className="w-full bg-white shadow-md table-auto">
                  <thead className="bg-blue-800 text-white">
                    <tr className="">
                      <th className="py-2 px-10">Foto de Perfil</th>
                      <th className="p-2">Nombre del Contacto</th>
                      <th className="p-2">Correo Institucional</th>
                      <th className="p-2">Carrera</th>
                      <th className="p-2">Centro</th>
                      <th className="p-2">Eliminar Contacto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listContacts.map((estudiante) => (
                      <tr className="border-b" key={estudiante.ID_USER}>
                        <td className="border px-4 py-2 text-base font-bold r">
                          <div className="bg-gray-300 w-20 h-20 mx-auto rounded-full mb-2">
                            {estudiante.URL ? (
                              <img
                                src={estudiante.URL}
                                alt="Foto"
                                className="w-20 h-20 mx-auto rounded-full"
                              />
                            ) : (
                              <img
                                src={fondoPerfil}
                                alt="Foto"
                                className="w-20 h-20 mx-auto rounded-full"
                              />
                            )}
                          </div>
                        </td>
                        <td className="border px-4 py-2 text-base font-bold r">
                          {estudiante.NAME}
                        </td>
                        <td className="border px-4 py-2 text-base font-bold r">
                          {estudiante.INSTITUTIONAL_EMAIL}
                        </td>
                        <td className="border px-4 py-2 text-base font-bold r">
                          {estudiante.CAREER}
                        </td>
                        <td className="text-center border px-4 py-2 text-base font-bold r">
                          {estudiante.CENTER}
                        </td>
                        <td className="border px-4 py-2 text-base font-bold r">
                          <div className="flex justify-center">
                            <AiFillDelete
                              className="cursor-pointer"
                              onClick={() => handleDelete(estudiante.ID_USER)}
                              size={25}
                            >
                              Activar
                            </AiFillDelete>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="text-center text-xl text-black font-black text-cente">
                No tienes ningún contacto.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListContacts;
