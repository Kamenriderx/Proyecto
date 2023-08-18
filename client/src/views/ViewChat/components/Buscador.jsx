import { useContext, useEffect, useState } from "react";
import ConversationContext from "../context/Conversation/ConversationContext";
import { StoreContext } from "../../../store/ContextExample";
import StudentContext from "../../ViewStudent/context/StudentContext";
import MessagesContext from "../context/Messages/MessagesContext";
import fondoPerfil from "../../../assets/fondoPerfil.jpg";

import fondoPerfil from "../../../assets/fondoPerfil.jpg";


const Buscador = ({ chats, enviarDatoAlPadre, check }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  //chat seleccionado
  const [chat, setChat] = useState(null);

  //contexto de usuario
  const { state } = useContext(StoreContext);
  //contexto de estudiante
  const { stateStudent, getStudent } = useContext(StudentContext);
  //contexto de la conversacion
  const { stateConversation, getConversation } =
    useContext(ConversationContext);
  //contexto de mensajes
  const { stateMessages, getMessages } = useContext(MessagesContext);

  useEffect(() => {
    getConversation(state);
    getStudent(state);
    getMessages(state);
  }, [state, check]);

  // console.log(
  //   "stateConversationBuscador: ",
  //   stateConversation?.results?.results
  // );
  // console.log(
  //   "stateStudentBuscador: ",
  //   stateStudent?.user?.user?.multimedia[
  //     stateStudent.user.user.multimedia.length - 1
  //   ].URL
  // );

  useEffect(() => {
    setUsers(chats);
  }, []);

  //funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  const results = !search
    ? stateConversation?.results?.results
    : stateConversation?.results?.results.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLowerCase())
      );

  const handleChange = (id, chat) => {
    enviarDatoAlPadre(id, chat);
  };

  return (
    <>
      {stateStudent && (
        <>
          <div className="bg-gray-200 h-16 border-b-2 border-gray-500 ">
            {/*
            
            <input
              type="text"
              placeholder="buscar"
              value={search}
              onChange={searcher}
              className="rounded-2xl m-3"
            />
            */}
          </div>
          <div className="overflow-y-auto scrollbar-thin h-[505px] ">
            {results && (
              <>
                {results.map((chat) => (
                  <div
                    key={chat.ID_CONVERSATION}
                    className="border-2 border-gray-400 m-3 p-2 rounded-xl flex justify-between cursor-pointer hover:bg-gray-300"
                    onClick={() => handleChange(chat.ID_CONVERSATION, chat)}
                  >
                    <div className="flex gap-2 items-center">
                      <div>
                        <img
                          src={
                            chat.USER_.hasOwnProperty("multimedia") &&
                            chat.USER_.multimedia.length > 0
                              ? chat.USER_.multimedia[
                                  chat.USER_.multimedia.length - 1
                                ].URL
                              : fondoPerfil
                          }
                          alt="seleccine imagen"
                          className="bg-cyan-500 rounded-full w-12 h-12"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {chat.USER_.NAME}
                        </p>
                        <p className="text-sm">{}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 justify-center">
                      <div className="text-xs">{chat.hour}</div>
                      <div className="bg-gray-200 rounded-full w-6  text-center text-sm font-semibold">
                        {chat.USER_.STATE}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Buscador;
