import { useEffect, useState } from "react";
import Contact from "./Contact";
import { BiSearch } from "react-icons/Bi";
import { io } from "socket.io-client";
import { httpRequests } from "../utils/helpers/httpRequests";


const OnlineList = ({setCheck,check,socket}) => {  
  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState([]);
  const [ownerList, setOwnerList] = useState(0);

  useEffect(() => {
    socket.on("onlineList", (data) => {
      setOwnerList(data.ownerList);
      if(searchValue!==""){
        search();
      }else{
        
        setList(data.arrUsers);
      }
    });
    socket.on("reloadList", (data) => {
      if (searchValue.trim() !== "") {
        search();
      }else{
        getList();
      }
    });
  }, [socket]);

  useEffect(() => {
    if (searchValue !== "") {
      search();
    } else {
      getList();
      
    }
  }, [searchValue]);

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setSearchValue(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    search();
  };
  const getList = () => {
    httpRequests()
      ["get"]("http://localhost:3000/registro/onlineList/getList", {
        headers: {
          authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setOwnerList(res.data.ownerList)
        setList(res.data.arrUsers);
      });
      setSearchValue("");
  };
  const search = () => {
    httpRequests()
      ["post"]("http://localhost:3000/registro/onlineList/searchList", {
        headers: {
          authorization:
          `Bearer ${localStorage.getItem("token")}`,
        },
        body: { userName: searchValue },
      })
      .then((res) => {
        setList(res.data.arrUsers);
      });
  };
  return (
    <div className=" max-w-md h-screen mx-auto bg-white rounded-sm  flex flex-col px-0 items-center content-between justify-between">
      <div className="flex justify-center items-center  w-full bg-gray-200 border-b-2 border-gray-500 h-16 p-2 font-bold">
        <h1 className="m-3">CONTACTOS</h1>
      </div>

      <div className="h-5/6  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        <fieldset className="border p-4 rounded-sm">
          <legend className="text-xl font-normal text-center mb-2">
            En linea
          </legend>
          {list
            .filter((contact) => contact.ONLINE_STATUS === "online")
            .map((contact) => (
              <Contact
                key={contact.ID_USER}
                userId={contact.ID_USER}
                state={"green"}
                userName={contact.NAME}
                photo={contact.PROFILE_PHOTO}
                ownerList={ownerList}
                setCheck={setCheck}
                check = {check}
              />
            ))}
        </fieldset>
        <fieldset className="border p-4 rounded-sm">
          <legend className="text-xl font-normal text-center mb-2">
            Otros contactos
          </legend>
          {list
            .filter((contact) => contact.ONLINE_STATUS === "offline")
            .map((contact) => (
              <Contact
                key={contact.ID_USER}
                userId={contact.ID_USER}
                state={"gray"}
                userName={contact.NAME}
                photo={contact.PROFILE_PHOTO}
                ownerList={ownerList}
                setCheck={setCheck}
                check = {check}
              />
            ))}
        </fieldset>
      </div>

      <div className="h-16 flex justify-center items-center border border-t-gray-100 w-full">
        <button
          className="w-12 h-12 cursor-pointer hover:bg-gray-200 flex justify-center items-center rounded-s-md"
          onClick={handleClick}
        >
          <BiSearch />
        </button>
        <input
          type="text"
          placeholder="Buscar"
          className=" border border-none placeholder:text-center"
          value={searchValue}
          onInput={handleChange}
        />
      </div>
    </div>
  );
};

export default OnlineList;
