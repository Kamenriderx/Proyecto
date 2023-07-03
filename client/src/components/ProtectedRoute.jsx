/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom"
import Swal from 'sweetalert2'

const ProtectedRoute = ({isAllowed, login, children, redirecTo='/'}) => {
  console.log('isAllowed: ',isAllowed)
  console.log('login: ',login)


  function mostrar() {
    Swal.fire({
      title: 'Sin autorizacion',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    })
  }


  if(!isAllowed && login){
    return(
      <>
      {mostrar()}
      <Navigate to={redirecTo}/>
      </>
    )
  }

  if(!isAllowed && !login){
    return(
      <>
      <Navigate to={redirecTo}/>
      </>
    )
  }

  return children? children : <Outlet/>
}

export default ProtectedRoute