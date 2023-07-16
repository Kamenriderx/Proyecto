import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../store/ContextExample";
import axios from "axios";
import useStudents from "../../utils/hooks/useStudents";

const CardTeachers = ({ student }) => {
  const { state, dispatch } = useContext(StoreContext);
  const {pendings } = useStudents();

  const enviarSolicitudContacto = async () => {
    const senderId = `${state.user.ID_USER}`;
    const recipientId = `${student.user.ID_USER}`;

    try {
      const res = await axios.post(
        "http://localhost:3000/registro/contacts/contact-requests",
        { senderId, recipientId }
      );

    } catch (error) {
      console.error("Error al enviar la solicitud", error);
    }
  };

  const eliminarSolicitud = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/registro/contacts/contact-requests/${id}/cancel`
      );

    } catch (error) {
      console.log(error);
    }
  };


  /*   const esRemitente = state.user.ID_USER === pendings.senderId;
const esDestinatario = state.user.ID_USER === pendings.recipientId; */

  return (
    <>
      <div className="mt-10 mx-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex">
            <img
              className="object-cover md:w-48"
              src={student.user?.multimedia[0]?.URL}
              alt="Imagen de perfil"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-lg font-bold text-indigo-500">
              {student.user.NAME}
            </div>
            <p className="mt-2 text-gray-500 text-lg">
              <span className="font-bold text-gray-700">Carrera: </span>
              {student.CAREER}
            </p>
            <p className="mt-2 text-gray-500 text-lg">
              <span className="font-bold text-gray-700">Correo: </span>
              {student.user.EMAIL}
            </p>
            <p className="mt-2 text-gray-500 text-lg">
              <span className="font-bold text-gray-700">
                Centro de Estudio:{" "}
              </span>
              {student.user.CENTER}
            </p>
            <p className="mt-2 text-gray-500 text-lg">
              <span className="font-bold text-gray-700">
                Numero de Cuenta:{" "}
              </span>
              {student.user.ACCOUNT_NUMBER}
            </p>
            <div className="mt-4">
              <input
                className={
                  "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                }
                value="Enviar Solicitud"
                type="submit"
                onClick={enviarSolicitudContacto}
              />
              {pendings.map((pending) => {
                if (
                  pending.senderId.includes(requestId) ===
                    pending.recipientId.includes(requestId) &&
                  pending.status === "pending"
                ) {
                  return (
                    <input
                      className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
                      value="Rechazar Solicitud"
                      type="submit"
                      onClick={() => eliminarSolicitud(pending.requestId)}
                    />
                  );
                } else if (
                  (state.user.ID_USER === pending.senderId &&
                    pending.status === "accepted" &&
                    pending.senderId.includes(requestId) ===
                      pending.recipientId.includes(requestId)) ||
                  (state.user.ID_USER === pending.recipientId &&
                    pending.status === "accepted" &&
                    pending.recipientId.includes(requestId) ===
                      pending.senderId.includes(requestId))
                ) {
                  return (
                    <input
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                      value="Ahora somos contacto"
                      type="submit"
                    />
                  );
                } else if (
                  (state.user.ID_USER === pending.senderId &&
                    pending.status === "rejected" &&
                    pending.senderId.includes(requestId) ===
                      pending.recipientId.includes(requestId)) ||
                  (state.user.ID_USER === pending.recipientId &&
                    pending.status === "rejected" &&
                    pending.recipientId.includes(requestId) ===
                      pending.senderId.includes(requestId))
                ) {
                  return (
                    <input
                      className={
                        "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                      }
                      value="Enviar Solicitud"
                      type="submit"
                      onClick={enviarSolicitudContacto}
                    />
                  );
                }
                {
                  return (
                    <input
                      className={
                        "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                      }
                      value="Enviar Solicitud"
                      type="submit"
                      onClick={enviarSolicitudContacto}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTeachers;
