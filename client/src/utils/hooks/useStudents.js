import {useContext} from 'react'
import StudentContext from '../../context/contextStudents/StudentProvider'

const useStudents = () => {
  return useContext(StudentContext)
}

export default useStudents