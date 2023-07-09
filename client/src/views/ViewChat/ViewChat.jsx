import { MdSend } from "react-icons/Md";
import Buscador from "./components/Buscador";
import { useState } from "react";

const ViewChat = () => {
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

  const [allMessages, setAllMessages] = useState(messages);
  const [getMessageInput, setGetMessageInput] = useState('');


  const messageInput = (e) => {
    console.log(e.target.value);
    setGetMessageInput(e.target.value);
  };

  const sendMessage = () => {
    console.log(getMessageInput);
    setGetMessageInput('')
    setAllMessages([...allMessages, {
      id: allMessages.length + 1,
      send: 1,
      receive: 2,
      message: getMessageInput
    }])
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <div className="w-1/4 ">
          <Buscador chats={chats} />
        </div>
        <div className="w-1/2">
          <div>
            <div className="bg-gray-200 flex gap-4 border-b-2 border-gray-500 h-16 p-2">
              <div className="bg-cyan-500 rounded-full w-12 h-12 "></div>
              <div className="flex flex-col justify-center">
                <p className="font-bold">Nombre</p>
                <p className="text-sm">Activo</p>
              </div>
              <div className="bg-gray-400 rounded-full w-4 h-4 mt-4"></div>
            </div>

            <div className="overflow-y-auto scrollbar-thin h-[450px]">
              {allMessages.map((mess) => (
                <>
                  {mess.send == 1 ? (
                    <div className="m-4 flex gap-2" key={mess.id}>
                      <div className="bg-cyan-400 rounded-full h-12 w-12"></div>
                      <div className="h-auto w-4/5 bg-gray-100 border border-black rounded-tr-2xl rounded-bl-2xl p-2">
                        <p className="break-words ">
                          {mess.message}
                        </p>
                        <p className="text-xs float-right">3:30 P.M</p>
                      </div>
                    </div>
                  ) : (
                    <div className="m-4 flex gap-2 justify-end" key={mess.id}>
                      <div className="h-auto w-4/5 bg-gray-100 border border-black rounded-tr-2xl rounded-bl-2xl p-2">
                        <p className="break-words">
                        {mess.message}
                        </p>
                        <p className="text-xs float-right">3:30 P.M</p>
                      </div>
                      <div className="bg-cyan-400 rounded-full h-12 w-12"></div>
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
          </div>
        </div>
        <div className="w-1/4 bg-green-500 "></div>
      </div>
    </>
  );
};

export default ViewChat;
