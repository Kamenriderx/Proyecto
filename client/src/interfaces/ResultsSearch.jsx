import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import useStudents from '../utils/hooks/useStudents'
import CardTeachers from './components/CardTeachers'

const ResultsSearch = () => {
    const location= useLocation()

    const navigate = useNavigate();

  const handleVolverAtras = () => {
    navigate(-1); 
  };

    const {docentes} = useStudents()

    const teachersFilteres = docentes.filter(({user})=>user.NAME.toLowerCase().includes(location.state.toLowerCase()) || user.ACCOUNT_NUMBER.toString().includes(location.state.toLowerCase()))

  return (
     <div className=''>
      <p className="text-md text-gray-700 text-2xl font-bold uppercase py-5">
        Se encontraron <span>{teachersFilteres.length}</span> resultados :
      </p>
      <button className='bg-sky-600 hover:bg-sky-800 cursor-pointer rounded-lg shadow py-2 px-3 text-white text-xl mx-3 font-bold' onClick={handleVolverAtras}>Volver</button>
      <div className='grid grid-cols-2'>
        {
          teachersFilteres.map(docente=> <CardTeachers docente={docente} key={docente.ID_PROFFERSSOR}/>)
        }
      </div>
    </div>
  )
}

export default ResultsSearch