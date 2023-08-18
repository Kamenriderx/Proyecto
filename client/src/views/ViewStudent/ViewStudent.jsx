import "flowbite";
import { AiFillEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/Md";

import Avatar from "./components/Avatar";
import Sidevar from "./components/Sidevar";
import Carrusell from "./components/Carrusell";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/ContextExample";
import StudentContext from "./context/StudentContext";

import io from "socket.io-client";

const ViewStudent = () => {
  let socket = "";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      socket = io(
        `http://localhost:3000?token=${localStorage.getItem("token")}`
      );
    }
  }, [localStorage.getItem("token")]);

  //contexto de usuario
  const { state } = useContext(StoreContext);

  //contexto de estudiante
  const { stateStudent, getStudent, putCorreo } = useContext(StudentContext);

  const user = {
    visitante: false,
  };

  const [showModal, setshowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState(email);

  //Guardar el perfil
  const [buttonDisabled, setbuttonDisabled] = useState(false);

  useEffect(() => {
    getStudent(state);
  }, [state]);

  const handleEmailChange = (e) => {
    setNewEmail({ EMAIL: e.target.value });
  };

  const handleUpdateEmail = async () => {
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(newEmail.EMAIL)) {
      return alert(`${newEmail.EMAIL} es un correo electrónico incorrecto.`);
    }

    setEmail(newEmail);
    setshowModal(false);

    await putCorreo(state, newEmail.EMAIL);
    await getStudent(state);
  };

  const closeModal = () => {
    setshowModal(false);
  };

  console.log("ESTADO ESTUDIANTE", stateStudent);

  return (
    <>
      {stateStudent && (
        <>
          <Sidevar />
          <div className="p-4 sm:ml-64 m-8">
            <div className="flex flex-row bg-gray-50">
              <div className="basis-1/2 border-2 border-gray-300">
                <div className="flex flex-row items-center justify-center ">
                  <div className="basis-1/3">
                    <Avatar user={user} />
                  </div>
                  <div className="basis-1/2">
                    <div className="flex flex-col m-4">
                      <div className="font-bold">
                        {stateStudent.user.user.NAME}
                      </div>
                      <div className="text-sm text-gray-500">
                        {stateStudent.user.CAREER}
                      </div>
                      <div className="text-md text-gray-500">
                        {stateStudent.user.user.CENTER}
                      </div>
                      {user.visitante && (
                        <button
                          className="bg-cyan-200 rounded-full font-semibold hover:bg-cyan-300 mt-2 w-24 h-8 border border-black text-center"
                          disabled={buttonDisabled}
                          onClick={() => setbuttonDisabled(true)}
                        >
                          {!buttonDisabled ? `Agregar` : "Enviada..."}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="basis-1/2 border-2 border-gray-300 flex flex-row items-center justify-center">
                <div className="border-2 border-gray-300 basis-1/5 m-4">
                  <div className="flex flex-col p-2 items-center bg-white">
                    <div className="text-sm">Clases</div>
                    <div className="text-4xl font-bold">22</div>
                  </div>
                </div>
                <div className="border-2 border-gray-300 basis-1/5 m-4">
                  <div className="flex flex-col p-2 items-center bg-white">
                    <div className="text-sm">Promedio</div>
                    <div className="text-4xl font-bold">75%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-300 mt-8">
              <div className="p-2 border-b-2 border-gray-300 text-xl bg-gray-50">
                <div className="flex justify-between">
                  <div>Información</div>
                  {!user.visitante && (
                    <AiFillEdit
                      className="flex-shrink-0 w-8 h-8 text-gray-500 cursor-pointer"
                      onClick={() => setshowModal(true)}
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex m-4 items-center gap-2 border-b-2 pb-2">
                    <MdEmail className="flex-shrink-0 w-8 h-8 text-gray-500" />
                    <div>
                      <div className="text-sm">Correo Personal</div>
                      <div>{stateStudent.user.user.EMAIL}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex m-4 items-center gap-2 border-b-2 pb-2">
                    <MdEmail className="flex-shrink-0 w-8 h-8 text-gray-500" />

                    <div>
                      <div className="text-sm">Correo Institucional</div>
                      <div>{stateStudent.user.INSTITUTIONAL_EMAIL}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-300 mt-8 ">
              <div className="p-2 w-full border-b-2 border-gray-300 text-xl bg-gray-50">
                Imágenes
              </div>
              <Carrusell user={user} />
            </div>
          </div>
          {showModal && (
            <div className="animate__animated animate__fadeIn fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="bg-white rounded-lg p-8 z-10 w-2/6">
                <h2 className="text-xl font-bold mb-4">
                  ACTUALIZAR CORREO PERSONAL
                </h2>

                <div className="relative my-4">
                  <input
                    type="email"
                    id="floating_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={newEmail.EMAIL}
                    onChange={handleEmailChange}
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Nuevo correo
                  </label>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleUpdateEmail}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded-full mr-2 w-24 "
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 rounded-full w-24 "
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewStudent;
