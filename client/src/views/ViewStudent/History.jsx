import { useContext, useEffect, useState } from "react";
import TableRow from "./components/TableRow";
import { httpRequests } from "../../utils/helpers/httpRequests";
import {AiOutlineSearch} from "react-icons/ai"
import StudentCard from "./components/StudentCard";
import { StoreContext } from "../../store/ContextExample";
import Pagination from "../History/components/Pagination";
const History = () => {
  const [viewableSections,setViewableSections] = useState([]);
  const [pagination,setPagination] = useState({
    page:1,
    pages:0,
    items:8
  });

  const [enrollments, setEnrollments] = useState([]);
  const [proms, setProms] = useState({
    global:0,
    period:0
  });
  
  const [basicInformation, setBasicInformation] = useState({
    CENTER:""
  });

  const [searchValue,setSearchValue] = useState("");

  const onChange = (e) =>{
    const value = e.target.value;
    setSearchValue(value);

  }
  const handdleSubmit = () =>{
    httpRequests()
      ["post"]("http://localhost:3000/registro/history/searchHistory", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: { user_account:searchValue },
    })
      .then((res) => {
        let globalProm;
        let periodProm;
        let totalUV=0;
        let totalSum=0;
        
        let totalLastPeriodUV=0;
        let totalLastPeriodSum=0;
        res.data.data.forEach(enrollment=>{
            if(enrollment.calification!==0){

            
            totalUV += enrollment.uv ;
            totalSum += enrollment.uv*enrollment.calification
            
            if(enrollment.ID_PERIOD === res.data.lastPeriod ){
                totalLastPeriodUV += enrollment.uv;
                totalLastPeriodSum += enrollment.uv*enrollment.calification
            }
        }
        });
        console.log("Suma total:",totalUV);
        globalProm = totalSum  /totalUV;
        periodProm = totalLastPeriodSum /totalLastPeriodUV;
        setProms({global:globalProm,period:periodProm});

        setEnrollments(res.data.data);
        setBasicInformation(res.data.basicInformation);

        setPagination({...pagination,page:1,pages:Math.ceil(res.data.data.length/pagination.items)});
        let viewSections = [];
        for(let i = 0; i<  pagination.items;i++){
          if( res.data.data[i] ){
            console.log("Es indefinido?:",res.data.data[i])
            viewSections.push( res.data.data[i]);
          }
        }

        setViewableSections(viewSections);

      });
  }

  
  useEffect(() => {
    let viewSections = [];
        for(let i = pagination.page*pagination.pages; i<pagination.page*pagination.pages + pagination.items;i++){
          if(enrollments[i]){
            viewSections.push(enrollments[i]);
          }
        }

    setViewableSections(viewSections);

  }, [pagination.page])

  return (
    <div className="w-10/12">
      <div className="w-full flex items-center justify-center ">
        <div className="flex items-center justify-center border w-2/5 h-[150px] border-none  border-r-black">
            <input className=" h-8" type="text" placeholder="Buscar" value={searchValue} onChange={ (e)=>onChange(e)} />
            <button onClick={()=>handdleSubmit()} className="rounde bg-slate-300 w-8 h-8 flex items-center justify-center outline-none focus:outline-none "  ><AiOutlineSearch/></button>

        </div>

      </div>
      <div className=" ">
        <div className=" border m-2 p-4 mb-10">
          <div className="text-center border rounded-t bg-blue-100 mb-3">
            informacion general
          </div>
          <div className="flex justify-evenly">
            <div className="flex w-1/2">
              <div className="flex w-1/2">
                <ul className="font-bold">
                  <li>CUENTA: </li>
                  <li>NOMBRE: </li>
                  <li>CARRERA: </li>
                </ul>
              </div>
              <div className="flex w-1/2">
                <ul>
                  <li>{basicInformation.ACCOUNT_NUMBER}</li>
                  <li>{basicInformation.NAME}</li>
                  <li>{basicInformation.CAREER}</li>
                </ul>
              </div>
            </div>
            <div className="flex w-1/2">
              <div className="w-1/2">
                <ul className="font-bold">
                  <li>CENTRO:</li>
                  <li>INDICE GLOBAL:</li>
                  <li>INDICEDE PERIODO:</li>
                </ul>
              </div>
              <div className="w-1/2">
                <ul>
                  <li>{basicInformation.CENTER}</li>
                  <li>{isNaN(proms.global) ? "0" : proms.global}</li>
                  <li>{isNaN(proms.period)?"0":proms.period}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="text-center border p-1   bg-blue-100">
            Historial academico
          </div>

          <div>
            <ul className="flex justify-around font-bold bg-blue-100 ">
              <li className="border border-blue-100 w-1/12 text-center">
                CODIGO
              </li>
              <li className="border border-blue-100 w-4/12 text-center">
                ASIGNATURA
              </li>
              <li className="border border-blue-100 w-1/12 text-center">UV</li>
              <li className="border border-blue-100 w-1/12 text-center">
                SECCION
              </li>
              <li className="border border-blue-100 w-1/12 text-center">AÑO</li>
              <li className="border border-blue-100 w-1/12 text-center">
                PERIODO
              </li>
              <li className="border border-blue-100 w-2/12 text-center">
                CALIFICAION
              </li>
              <li className="border border-blue-100 w-1/12 text-center">OBS</li>
            </ul>
            {viewableSections.map((note) => {
                if(note.calification>0){
                    return (
                        <TableRow {...note} />
                    );
                }
                
            }
              
            )}
      <div className="flex justify-center">
        <Pagination setPagination = {setPagination} pagination={pagination}/>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
