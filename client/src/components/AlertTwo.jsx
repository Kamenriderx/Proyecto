import {useEffect} from 'react'
import Swal from 'sweetalert2'

const AlertTwo = ({alerta}) => {
    useEffect(() => {
        alerta.error ? 
          Swal.fire({
            position:'center',
            title: 'Error',
            text: alerta.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          })
         : 
          Swal.fire({
            position:'center',
            title: 'Éxito',
            text: alerta.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          })
      }, [alerta]);
    
      return null;
}

export default AlertTwo