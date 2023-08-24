import { useEffect, useState } from "react";
import { httpRequests } from "../../../utils/helpers/httpRequests";

const Table = (props) => {
  const [enrollmentStudents, setEnrollmentStudents] = useState([]);

  useEffect(() => {
    httpRequests()["get"]("http://localhost:3000/registro/enrollment/getListPayment",{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}}).then(res=>{
      setEnrollmentStudents(res.data.enrollmentStudents);
      console.log(res);
    });  
  
  }, [])
  
  return (
    <div className="p-8 mt-5 border border-gray-300 w-2/3 rounded-md">
      <ul className="flex flex-row w-full h-8 border border-gray-300 font-black" >
        <li className="w-1/3 flex justify-center align-middle">Nombre</li>
        <li className="w-1/3 flex justify-center align-middle">Numero de cuenta</li>
        <li className="w-1/3 flex justify-center align-middle">Centro</li>
      </ul>
      <ul >
        {enrollmentStudents.map((student) => (
          <ul className="flex flex-row justify-center align-middle  w-full h-8  border-b-2 mt-2">
            <li className="w-1/3 flex justify-center align-middle">{student.NAME}</li>
            <li className="w-1/3 flex justify-center align-middle">{student.ACCOUNT_NUMBER}</li>
            <li className="w-1/3 flex justify-center align-middle">{student.CENTER}</li>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Table;
