import { useEffect, useState } from "react";

const Buscador = ({ chats }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  //chat seleccionado
  const [chat, setChat] = useState(null);

  const getChat = (id) => {
    setChat(id);
  };

  console.log(chat);

  useEffect(() => {
    setUsers(chats);
  }, []);

  //funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  const results = !search
    ? users
    : users.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <>
      <div className="bg-gray-200 h-16 border-b-2 border-gray-500">
        <input
          type="text"
          placeholder="buscar"
          value={search}
          onChange={searcher}
          className="rounded-2xl m-3"
        />
      </div>
      <div className="overflow-y-auto scrollbar-thin h-[505px]">
        {results.map((chat) => (
          <div
            key={chat.id}
            className="border-2 border-gray-400 m-3 p-2 rounded-xl flex justify-between"
            onClick={() => getChat(chat.id)}
          >
            <div className="flex gap-2 items-center">
              <div>
                <div className="bg-cyan-500 rounded-full w-12 h-12"></div>
              </div>

              <div>
                <p className="text-sm font-semibold">{chat.name}</p>
                <p className="text-sm">{chat.lastMessage}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 justify-center">
              <div className="text-xs">{chat.hour}</div>
              <div className="bg-gray-200 rounded-full w-6  text-center text-sm font-semibold">
                {chat.cantMessages}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Buscador;
