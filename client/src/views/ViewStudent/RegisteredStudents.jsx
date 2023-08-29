import { useContext, useState } from "react";
import Pagination from "./components/Pagination";
import Table from "./components/Table";
import History from "./History";
import { StoreContext } from "../../store/ContextExample";


const style = {
    button: {
      width: "33%",
      height:"100%",
      cursor: "pointer",
    },
    buttonContainer:{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      top:0,
      height:"50px",
      width: "50%",
      marginBottom: "20px",
    },
    loginForm:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "70%",
    }
  
  };
const students = [
  {
    name: "Anibal Alejandro Reyes Maradiaga",
    account: "20171003445",
    period: "III Periodo 2023",
  },
  {
    name: "Anibal Alejandro Reyes Maradiaga",
    account: "20171003445",
    period: "III Periodo 2023",
  },
  {
    name: "Anibal Alejandro Reyes Maradiaga",
    account: "20171003445",
    period: "III Periodo 2023",
  },
  {
    name: "Anibal Alejandro Reyes Maradiaga",
    account: "20171003445",
    period: "III Periodo 2023",
  },
  {
    name: "Anibal Alejandro Reyes Maradiaga",
    account: "20171003445",
    period: "III Periodo 2023",
  },
];

const RegisteredStudents = () => {
  const [viewableSections,setViewableSections] = useState([]);
  const [pagination,setPagination] = useState({
    page:1,
    pages:0,
    items:8
  });
  const { state, dispatch } = useContext(StoreContext);
    const [view, setView] = useState("historial");
  const [className, setClassName] = useState({
    matriculados: {
      className: "",
    },
    historial: {
      className:
        "outline-none ring-2 ring-sky-500 bg-sky-500  ring-offset-2  text-white",
    },
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setView(value);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const defaultState = {
      matriculados: {
        className: "",
      },
      historial: {
        className: "",
      }

    };

    defaultState[value].className =
      "outline-none ring-2 ring-sky-500 ring-offset-2 bg-sky-500 text-white";
    setClassName(defaultState);
    handleChange(e);
  };

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(20);

  return (
    <div className="w-full flex flex-col pt-2   items-center h-full">
      {
        state?.user?.ID_ROLE !== 4 &&
        <div style={style.buttonContainer}>
          <button
            style={style.button}
            className={` hover:text-white hover:bg-sky-500 bg-sky-400 hover:border-transparent ${className.matriculados.className}`}
            name="loginType"
            value="matriculados"
            onClick={handleSelect}
          >
            Matriculados
          </button>
          <button
            style={style.button}
            className={` hover:text-white hover:bg-sky-500 bg-sky-400 hover:border-transparent ${className.historial.className}`}
            name="loginType"
            value="historial"
            onClick={handleSelect}
          >
            Historial
          </button>

        </div>

      }

        <div className="w-full flex justify-center flex-col items-center">

        {
        view==="matriculados" &&
        <>
        <Table />
       
        </>
    }
      {
        view==="historial" &&
        <History />
                

       }


        </div>
      
    </div>
  );
};

export default RegisteredStudents;
