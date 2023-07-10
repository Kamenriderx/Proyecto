import fondoPerfil from "../../assets/fondoPerfil.jpg";

import { MdSend } from "react-icons/Md";
import Buscador from "./components/Buscador";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/ContextExample";
import io from "socket.io-client";
import StudentContext from "../ViewStudent/context/StudentContext";
import MessagesContext from "./context/Messages/MessagesContext";
import ConversationContext from "./context/Conversation/ConversationContext";

const ViewChat = () => {
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
  const { stateStudent, getStudent } = useContext(StudentContext);

  //contexto de mensajes
  const { stateMessages, getMessages } = useContext(MessagesContext);

  console.log("stateUsuario: ", state.user.ONLINE_STATUS);

  useEffect(() => {
    getStudent(state);
  }, [state]);


  const chats = [
    {
      id: 1,
      lastMessage: "hola",
      name: "nelson",
      cantMessages: 3,
      hour: "3:00 P.M",
    },
    {
      id: 2,
      lastMessage: "hola",
      name: "javier",
      cantMessages: 2,
      hour: "5:00 P.M",
    },
    {
      id: 3,
      lastMessage: "hola",
      name: "carlos",
      cantMessages: 12,
      hour: "8:00 P.M",
    },
    {
      id: 4,
      lastMessage: "hola",
      name: "jose",
      cantMessages: 25,
      hour: "11:00 P.M",
    },
    {
      id: 5,
      lastMessage: "hola",
      name: "miguel",
      cantMessages: 78,
      hour: "1:00 P.M",
    },
    {
      id: 6,
      lastMessage: "hola",
      name: "nelson",
      cantMessages: 3,
      hour: "3:00 P.M",
    },
    {
      id: 7,
      lastMessage: "hola",
      name: "javier",
      cantMessages: 2,
      hour: "5:00 P.M",
    },
    {
      id: 8,
      lastMessage: "hola",
      name: "carlos",
      cantMessages: 12,
      hour: "8:00 P.M",
    },
    {
      id: 9,
      lastMessage: "hola",
      name: "jose",
      cantMessages: 25,
      hour: "11:00 P.M",
    },
    {
      id: 10,
      lastMessage: "hola",
      name: "miguel",
      cantMessages: 78,
      hour: "1:00 P.M",
    },
  ];

  const messages = [
    {
      id: 1,
      send: 1,
      receive: 2,
      message: "mensaje 1 enviado",
    },
    {
      id: 2,
      send: 1,
      receive: 2,
      message: "mensaje 2 enviado",
    },
    {
      id: 3,
      send: 2,
      receive: 1,
      message: "mensaje 1 recibido",
    },
  ];

  console.log(
    "Imagen: ",
    stateStudent?.user?.user?.multimedia[
      stateStudent.user.user.multimedia.length - 1
    ].URL
  );

  console.log("ContextoUsuario: ", state.user.ID_USER);

  const [allMessages, setAllMessages] = useState(messages);
  const [getMessageInput, setGetMessageInput] = useState("");

  const messageInput = (e) => {
    console.log(e.target.value);
    setGetMessageInput(e.target.value);
  };

  const sendMessage = () => {
    console.log(getMessageInput);
    setGetMessageInput("");
    setAllMessages([
      ...allMessages,
      {
        id: allMessages.length + 1,
        send: 1,
        receive: 2,
        message: getMessageInput,
      },
    ]);
  };

  const [showMessages, setShowMessages] = useState(false);

  //recibir datos del componente hijo
  const [idConversation, setIdConversation] = useState("");
  const [chatConversation, setChatConversation] = useState(null);


  const recibirDatoDelHijo = (id, chat) => {
    setIdConversation(id);
    setChatConversation(chat)
    getMessages(state, id)
    setShowMessages(true);
  };


  console.log("ID DESDE EL COMPONENTE HIJO: ", idConversation);
  console.log("CONVERSACION DESDE EL COMPONENTE HIJO: ", chatConversation.USER_.multimedia);

  return (
    <>
      {stateStudent && (
        <>
          <div className="flex h-screen bg-gray-50">
            <div className="w-1/4 ">
              <Buscador chats={chats} enviarDatoAlPadre={recibirDatoDelHijo} />
            </div>
            <div className="w-1/2">
              <div>
                <div className="bg-gray-200 flex gap-4 border-b-2 border-gray-500 h-16 p-2">
                  {showMessages && stateMessages &&  (
                    <>
                      <img
                         src={
                          chatConversation.USER_.hasOwnProperty("multimedia")
                            ? chatConversation.USER_.multimedia[
                                chatConversation.USER_.multimedia.length - 1
                              ].URL
                            : fondoPerfil
                        }
                        alt="seleccine imagen"
                        className=" rounded-full w-12 h-12 "
                      />
                      <div className="flex flex-col justify-center">
                        <p className="font-bold">
                          {chatConversation.USER_.NAME}
                        </p>
                        <p className="text-sm">{chatConversation.USER_.ONLINE_STATUS}</p>
                      </div>
                    </>
                  )}
                </div>
                {showMessages && stateMessages && (
                  <>
                    <div className="overflow-y-auto scrollbar-thin h-[450px]">
                      {stateMessages.results.results.map((mess) => (
                        <>
                          {mess.SENDER_ID == state.user.ID_USER ? (
                            <div className="m-4 flex gap-2" key={mess.ID_MESSAGE}>
                              <img 
                              src={
                                mess.user.hasOwnProperty("multimedia")
                                  ? mess.user.multimedia[
                                      mess.user.multimedia.length - 1
                                    ].URL
                                  : fondoPerfil
                              }
                              alt="No hay imagen"
                              className="bg-cyan-400 rounded-full h-12 w-12"/>
                              <div className="h-auto w-4/5 bg-gray-100 border border-black rounded-tr-2xl rounded-bl-2xl p-2">
                                <p className="break-words ">{mess.CONTENT}</p>
                                <p className="text-xs float-right">{mess.createdAt}</p>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="m-4 flex gap-2 justify-end"
                              key={mess.ID_MESSAGE}
                            >
                              <div className="h-auto w-4/5 bg-gray-100 border border-black rounded-tr-2xl rounded-bl-2xl p-2">
                                <p className="break-words">{mess.CONTENT}</p>
                                <p className="text-xs float-right">{mess.createdAt}</p>
                              </div>
                              <img 
                              src={
                                mess.user.hasOwnProperty("multimedia")
                                  ? mess.user.multimedia[
                                      mess.user.multimedia.length - 1
                                    ].URL
                                  : fondoPerfil
                              }
                              alt="No hay imagen"
                              className="bg-cyan-400 rounded-full h-12 w-12"/>
                            </div>
                          )}
                        </>
                      ))}
                    </div>

                    <div className="flex gap-4 items-center bg-gray-200 rounded-2xl">
                      <input
                        value={getMessageInput}
                        type="text"
                        className="rounded-2xl p-2 m-2 w-full"
                        onChange={messageInput}
                      />
                      <MdSend
                        className="text-5xl mr-6 rounded-xl p-1 border text-blue-600 border-blue-600 hover:bg-blue-200 active:bg-blue-600 active:text-white"
                        onClick={sendMessage}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-1/4 bg-green-500 "></div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewChat;
