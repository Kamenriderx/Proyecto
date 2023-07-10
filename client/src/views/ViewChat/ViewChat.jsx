import fondoPerfil from "../../assets/fondoPerfil.jpg";

import { MdSend } from "react-icons/Md";
import Buscador from "./components/Buscador";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/ContextExample";
import io from "socket.io-client";
import StudentContext from "../ViewStudent/context/StudentContext";
import MessagesContext from "./context/Messages/MessagesContext";
import ConversationContext from "./context/Conversation/ConversationContext";
import OnlineList from "../../components/OnlineList";
import { httpRequests } from "../../utils/helpers/httpRequests";

const ViewChat = () => {
  const [socket, setSocket] = useState(null);
  const [check, setCheck] = useState(false);
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let s = io(`http://localhost:3000?token=${localStorage.getItem("token")}`);
      setSocket(s);
      dispatch({ type: "SOCKET", socket:s });
    }
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    socket?.emit("sendMessage", {})
  
    
  }, [])
  
  //contexto de usuario

  //contexto de estudiante
  const { stateStudent, getStudent } = useContext(StudentContext);
  const { stateMessages, getMessages } = useContext(MessagesContext);

  const [showMessages, setShowMessages] = useState(false);

  //recibir datos del componente hijo
  const [idConversation, setIdConversation] = useState("");
  const [getMessageInput, setGetMessageInput] = useState("");
  const [chatConversation, setChatConversation] = useState(null);
  //contexto de mensajes

  useEffect(() => {
    getStudent(state);
  }, [state]);

  const recibirDatoDelHijo = (id, chat) => {
    setIdConversation(id);
    setChatConversation(chat);
    getMessages(state, id);
    setShowMessages(true);
  };

  const messageInput = (e) => {
    setGetMessageInput(e.target.value);
  };

  useEffect(() => {
    socket?.on("getMessage",()=>{
      stateMessages(getMessages(state, idConversation));
    });
  }, [socket])
  

  const sendMessage = () => {
    httpRequests()["post"]("http://localhost:3000/registro/message/add", {
      body: {
        SENDER_ID: state.user.ID_USER,
        ID_CONVERSATION: idConversation,
        RECEIVER_ID: chatConversation.USER_.ID_USER,
        CONTENT: getMessageInput,
      },
    });
    setGetMessageInput("");
    stateMessages(getMessages(state, idConversation));
    socket.emit("sendMessage", {ID_RECEIVER: chatConversation.USER_.ID_USER})
  };

  return (
    <>
      {stateStudent && (
        <>
          <div className="flex h-screen bg-gray-50">
            <div className="w-1/4 ">
              <Buscador check={check} enviarDatoAlPadre={recibirDatoDelHijo} />
            </div>
            <div className="w-1/2">
              <div>
                <div className="bg-gray-200 flex gap-4 border-b-2 border-gray-500 h-16 p-2">
                  {showMessages && stateMessages && (
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
                        <p className="text-sm">
                          {chatConversation.USER_.ONLINE_STATUS}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                {showMessages && stateMessages && (
                  <>
                    <div className="overflow-y-auto scrollbar-thin h-[450px] flex flex-col-reverse  justify-end ">
                      {stateMessages.results.results.map((mess) => (
                        <div key={mess.SENDER_ID+""+ state.user.ID_USER}>
                          {mess.SENDER_ID == state.user.ID_USER ? (
                            <div
                              className="m-4 flex gap-2"
                              key={mess.ID_MESSAGE}
                            >
                              <img
                                src={
                                  mess.user.hasOwnProperty("multimedia")
                                    ? mess.user.multimedia[
                                        mess.user.multimedia.length - 1
                                      ].URL
                                    : fondoPerfil
                                }
                                alt="No hay imagen"
                                className="bg-cyan-400 rounded-full h-12 w-12"
                              />
                              <div className="h-auto w-4/5 bg-gray-100 border border-black rounded-tr-2xl rounded-bl-2xl p-2">
                                <p className="break-words ">{mess.CONTENT}</p>
                                <p className="text-xs float-right">
                                  {mess.createdAt}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="m-4 flex gap-2 justify-end"
                              key={mess.ID_MESSAGE}
                            >
                              <div className="h-auto w-4/5 bg-gray-100 border border-black rounded-tr-2xl rounded-bl-2xl p-2">
                                <p className="break-words">{mess.CONTENT}</p>
                                <p className="text-xs float-right">
                                  {mess.createdAt}
                                </p>
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
                                className="bg-cyan-400 rounded-full h-12 w-12"
                              />
                            </div>
                          )}
                        </div>
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
            <div className="w-1/4 bg-green-500 ">
              {socket && (
                <OnlineList setCheck={setCheck} check={check} socket={socket} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewChat;
