import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../store/ContextExample";

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const { state, dispatch } = useContext(StoreContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [pendings, setPendings] = useState([]);

<<<<<<< HEAD
      useEffect(() => {
        const getSolicitudes=async()=>{
            const res = await axios(`http://localhost:3000/registro/contacts/requestspendings/${state.user.ID_USER}`)
            console.log("Solicitudes Pendientes : ",res.data.pendingRequests);
            setSolicitudes(res.data.pendingRequests)
        }
        getSolicitudes()
      }, [state.user.ID_USER]
      )


      useEffect(() => {
        const getPending=async()=>{
            try {
                const res = await axios(`http://localhost:3000/registro/contacts/requests/${state.user.ID_USER}`)
                setPendings(res.data.pendingRequests)
                console.log("Las Solicitudes Pendientes : ", res.data.pendingRequests);   
            } catch (error) {
                console.log(error);
            }
          }
          getPending()
      }, [])

      console.log("Estadoooos : ", pendings
=======
  useEffect(() => {
    const getSolicitudes = async () => {
      const res = await axios(
        `http://localhost:3000/registro/contacts/requestspendings/${state.user.ID_USER}`
>>>>>>> f46a72e490a81bd75addcadf062c53dbc4014f6c
      );
      console.log("Solicitudes Pendientes : ", res.data);
      setSolicitudes(res.data.pendingRequests);
    };
    getSolicitudes();
  }, [state.user.ID_USER]);

  useEffect(() => {
    const getPending = async () => {
      try {
        const res = await axios(
          `http://localhost:3000/registro/contacts/requests/${state.user.ID_USER}`
        );
        setPendings(res.data.pendingRequests);
      } catch (error) {
        console.log(error);
      }
    };
    getPending();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios(
          "http://localhost:3000/registro/student/getStudents"
        );

        setStudents(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, [check]);

<<<<<<< HEAD
    return(
        <StudentContext.Provider value={{
            students,solicitudes,pendings,setPendings
        }}>
            {children}
        </StudentContext.Provider>
    )
}
=======
  if (loading) {
    return <div>Cargandoooooo....</div>;
  }
>>>>>>> f46a72e490a81bd75addcadf062c53dbc4014f6c

  return (
    <StudentContext.Provider
      value={{
        students,
        solicitudes,
        setSolicitudes,
        pendings,
        setPendings,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export { StudentProvider };

export default StudentContext;
