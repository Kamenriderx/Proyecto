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

  useEffect(() => {
    const getSolicitudes = async () => {
      const res = await axios(
        `http://localhost:3000/registro/contacts/requestspendings/${state.user.ID_USER}`
      );
      console.log("Solicitudes Pendientes : ", res.data);
      setSolicitudes(res.data);
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

  if (loading) {
    return <div>Cargandoooooo....</div>;
  }

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
