import Swal from 'sweetalert2'

const Alert = ({title, icon}) => {
  const mostrar = () => {
    Swal.fire({
      title: title,
      icon: icon,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    })
  }

  return(
    mostrar()
  )
}

export default Alert