import fondoPerfil from "../../assets/fondoPerfil.jpg";

import { MdSend } from "react-icons/Md";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

import Buscador from "./components/Buscador";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/ContextExample";
import io from "socket.io-client";
import StudentContext from "../ViewStudent/context/StudentContext";
import OnlineList from "../../components/OnlineList";
import { httpRequests } from "../../utils/helpers/httpRequests";

const ViewChat = () => {
  const [socket, setSocket] = useState(null);
  const [check, setCheck] = useState(false);
  const { state, dispatch } = useContext(StoreContext);

  //contexto de estudiante
  const { stateStudent, getStudent } = useContext(StudentContext);
  const [showMessages, setShowMessages] = useState(false);

  //recibir datos del componente hijo
  const [idConversation, setIdConversation] = useState("");
  const [getMessageInput, setGetMessageInput] = useState("");
  const [chatConversation, setChatConversation] = useState(null);

  const [contMessage, setContMessage] = useState(1);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let s = io(
        `http://localhost:3000?token=${localStorage.getItem("token")}`
      );
      setSocket(s);
      dispatch({ type: "SOCKET", socket: s });
    }
  }, [localStorage.getItem("token")]);

  const getMessages = async (id, numPag) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/message/${id}/${numPag}`,
        { ...config }
      );
      const results = await Promise.resolve(res);
      console.log("results: ", results.data);

      setMessages(results.data.results.results);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const recibirDatoDelHijo = (id, chat) => {
    setIdConversation(id);
    setChatConversation(chat);
    setContMessage(1);

    const getgetMessagesAsync = async () => {
      await getMessages(id, 1);
    };

    getgetMessagesAsync();
    setShowMessages(true);
  };

  useEffect(() => {
    getStudent(state);
  }, [state]);

  const messageInput = (e) => {
    setGetMessageInput(e.target.value);
  };

  const sendMessage = async () => {
    await httpRequests()["post"]("http://localhost:3000/registro/message/add", {
      body: {
        SENDER_ID: state.user.ID_USER,
        ID_CONVERSATION: idConversation,
        RECEIVER_ID: chatConversation.USER_.ID_USER,
        CONTENT: getMessageInput,
      },
    });
    setGetMessageInput("");
    socket?.emit("sendMessage", {
      RECEIVER_ID: chatConversation.USER_.ID_USER,
    });

    await getMessages(idConversation, 1);
  };

  useEffect(() => {
    socket?.on("getMessage", async (msg) => {
      await getMessages(idConversation, 1);
    });
  }, [socket, idConversation]);

  const pagination = async () => {
    setContMessage(contMessage + 1);
    await getMessages(idConversation, contMessage);
  };

  return (
    <>
      {stateStudent && (
        <>
          <div className="flex h-full bg-gray-50">
            <div className="w-1/4 ">
              <Buscador check={check} enviarDatoAlPadre={recibirDatoDelHijo} />
            </div>
            <div className="w-1/2">
              <div>
                <div className="bg-gray-200 flex gap-4 border-b-2 border-gray-500 h-16 p-2">
                  {showMessages && messages && (
                    <>
                      <img
                        src={
                          chatConversation?.USER_.hasOwnProperty(
                            "multimedia"
                          ) && chatConversation?.USER_?.multimedia.length > 0
                            ? chatConversation?.USER_?.multimedia[
                                chatConversation?.USER_?.multimedia?.length - 1
                              ].URL
                            : fondoPerfil
                        }
                        alt="IMG"
                        className=" rounded-full w-12 h-12 object-cover"
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
                {showMessages && messages && (
                  <>
                    <div className="overflow-y-scroll h-[500px] flex flex-col-reverse">
                      {messages.map((mess) => (
                        <div key={mess.ID_MESSAGE}>
                          {mess.SENDER_ID == state.user.ID_USER ? (
                            <div className="m-4 flex gap-2">
                              <img
                                src={
                                  mess.user?.hasOwnProperty("multimedia") &&
                                  mess.user?.multimedia.length > 0
                                    ? mess.user?.multimedia[
                                        mess.user?.multimedia?.length - 1
                                      ].URL
                                    : fondoPerfil
                                }
                                alt="IMG"
                                className="bg-cyan-400 rounded-full h-12 w-12 object-cover"
                              />
                              <div className="h-auto w-4/5 bg-gray-100 border border-black rounded-tr-2xl rounded-bl-2xl p-2">
                                <p className="break-words ">{mess.CONTENT}</p>
                                <p className="text-xs float-right">
                                  {new Date(mess.createdAt).getHours()}:
                                  {new Date(mess.createdAt).getMinutes()}:
                                  {new Date(mess.createdAt).getSeconds()}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="m-4 flex gap-2 justify-end ">
                              <div className="h-auto w-4/5 border border-black rounded-tr-2xl rounded-bl-2xl p-2 bg-gray-300">
                                <p className="break-words">{mess.CONTENT}</p>
                                <p className="text-xs float-right">
                                  {new Date(mess.createdAt).getHours()}:
                                  {new Date(mess.createdAt).getMinutes()}:
                                  {new Date(mess.createdAt).getSeconds()}
                                </p>
                              </div>
                              <img
                                src={
                                  mess.user?.hasOwnProperty("multimedia") &&
                                  mess.user?.multimedia.length > 0
                                    ? mess.user?.multimedia[
                                        mess.user?.multimedia?.length - 1
                                      ].URL
                                    : fondoPerfil
                                }
                                alt="IMG"
                                className="bg-cyan-400 rounded-full h-12 w-12 object-cover"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      {messages.length === 15 ? (
                        <div className="flex justify-center items-center p-1">
                          <BsFillArrowUpCircleFill
                            className=" text-blue-600 text-2xl  hover:text-blue-400 cursor-pointer"
                            onClick={pagination}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="flex gap-4 items-center bg-gray-200 rounded-2xl">
                      <input
                        value={getMessageInput}
                        type="text"
                        className="rounded-2xl p-2 m-2 w-full"
                        onChange={messageInput}
                      />
                      <MdSend
                        className="text-5xl mr-6 rounded-xl p-1 border text-blue-600 border-blue-600 hover:bg-blue-200 active:bg-blue-600 active:text-white cursor-pointer"
                        onClick={sendMessage}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-1/4">
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
