import {createContext,useState, useEffect} from 'react'
import axios from 'axios'

const StudentContext = createContext()

const StudentProvider=({children})=>{
    const [docentes, setDocentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [check,setCheck] = useState(false);

    /* const [searchTerm, setSearchTerm] = useState(''); */

  /*   const handleSearch = () => {
        const filteredDocentes = docentes.filter((docente) =>
          docente.user.NAME.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("resultados de busqueda",filteredDocentes);
      }; */



    useEffect(() => {
        const fetchDocentes = async () =>{
            try {
                const {data} = await axios('http://localhost:3000/registro/admin/getProfessors')
                console.log(data.professors);
                setDocentes(data.professors) 
                setLoading(false) 
            } catch (error) {
                console.log(error);
            }
        }
        fetchDocentes()
    }, [check])


    if(loading){
        return <div>Cargandoooooo....</div>
    }

    return(
        <StudentContext.Provider value={{
            docentes
        }}>
            {children}
        </StudentContext.Provider>
    )
}


export {StudentProvider}

export default StudentContext;
