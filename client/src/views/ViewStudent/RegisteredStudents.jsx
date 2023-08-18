import { useState } from "react";
import Pagination from "./components/Pagination";
import Table from "./components/Table";

const students = [
    {
        name:"Anibal Alejandro Reyes Maradiaga",
        account:"20171003445",
        period:"III Periodo 2023"
    },
    {
        name:"Anibal Alejandro Reyes Maradiaga",
        account:"20171003445",
        period:"III Periodo 2023"
    },
    {
        name:"Anibal Alejandro Reyes Maradiaga",
        account:"20171003445",
        period:"III Periodo 2023"
    },
    {
        name:"Anibal Alejandro Reyes Maradiaga",
        account:"20171003445",
        period:"III Periodo 2023"
    },
    {
        name:"Anibal Alejandro Reyes Maradiaga",
        account:"20171003445",
        period:"III Periodo 2023"
    },
]


const RegisteredStudents = () =>{

    const [page,setPage] = useState(1);
    const [pages,setPages] = useState(20);

    return (
        <div className="w-full flex flex-col pt-14   items-center h-full">
            <h2 className="text-xl border-spacing-6" >Estudiantes matriculados en Carrera</h2>


            <Table students ={students}/>
            <Pagination page={page} setPage={setPage} pages={pages}/>
            

        </div>

    );

}


export default RegisteredStudents;