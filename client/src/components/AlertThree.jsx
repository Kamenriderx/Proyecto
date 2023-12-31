import Swal from 'sweetalert2'

const AlertThree = ({alerta}) => {
  const {title, text, icon} = alerta

    const mostrar = () => {
      Swal.fire({
        position:'center',
        text: text,
        title: title,
        icon: icon,
        confirmButtonText: 'Aceptar'
      })
    }
  
    return(
      mostrar()
    )
}

export default AlertThree