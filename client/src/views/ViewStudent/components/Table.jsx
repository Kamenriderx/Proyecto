import { useEffect, useState } from "react";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import Pagination from "../../History/components/Pagination";

const Table = (props) => {
  const [enrollmentStudents, setEnrollmentStudents] = useState([]);
  const [viewableSections,setViewableSections] = useState([]);
  const [pagination,setPagination] = useState({
    page:1,
    pages:0,
    items:8
  });

  useEffect(() => {
    httpRequests()["get"]("http://localhost:3000/registro/enrollment/getListPayment",{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}}).then(res=>{
      setEnrollmentStudents(res.data.enrollmentStudents);
      setPagination({...pagination,page:1,pages:Math.ceil(res.data.enrollmentStudents.length/pagination.items)});
      let viewSections = [];
      for(let i = 0; i<  pagination.items;i++){
        if( res.data.enrollmentStudents[i] ){
          console.log("Es indefinido?:",res.data.enrollmentStudents[i])
          viewSections.push( res.data.enrollmentStudents[i]);
        }
      }

      setViewableSections(viewSections);
      console.log(res);
    });  
  
  }, [])

  useEffect(() => {
    let viewSections = [];
        for(let i = pagination.page*pagination.pages; i<pagination.page*pagination.pages + pagination.items;i++){
          if(enrollmentStudents[i]){
            viewSections.push(enrollmentStudents[i]);
          }
        }

    setViewableSections(viewSections);

  }, [pagination.page])
  
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="p-8 mt-5 border border-gray-300 w-2/3 rounded-md">
      <ul className="flex flex-row w-full h-8 border border-gray-300 font-black" >
        <li className="w-1/3 flex justify-center align-middle">Nombre</li>
        <li className="w-1/3 flex justify-center align-middle">Numero de cuenta</li>
        <li className="w-1/3 flex justify-center align-middle">Centro</li>
      </ul>
      <ul >
        {viewableSections.map((student) => (
          <ul className="flex flex-row justify-center align-middle  w-full h-8  border-b-2 mt-2">
            <li className="w-1/3 flex justify-center align-middle">{student.NAME}</li>
            <li className="w-1/3 flex justify-center align-middle">{student.ACCOUNT_NUMBER}</li>
            <li className="w-1/3 flex justify-center align-middle">{student.CENTER}</li>
          </ul>
        ))}
      </ul>
    </div>
      <div className="flex justify-center w-full">
        <Pagination setPagination = {setPagination} pagination={pagination}/>
      </div>

    </div>
  );
};

export default Table;
