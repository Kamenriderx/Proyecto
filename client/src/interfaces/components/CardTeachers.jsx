import {useState,useContext} from 'react'
import {StoreContext} from '../../store/ContextExample'
import axios from 'axios'

const CardTeachers = ({student}) => {

const { state, dispatch } = useContext(StoreContext);
  const [solicitudPendiente, setSolicitudPendiente] = useState(true);


  const enviarSolicitudContacto= async () => {
    const senderId = `${state.user.ID_USER}`; 
    const recipientId = `${student.user.ID_USER}`

    console.log("SolicitudData",senderId,recipientId);
  
    try {
     const res = await axios.post('URL_DE_TU_API', {senderId,recipientId})
     console.log(res.data);
     setSolicitudPendiente(false)
    } catch (error) {
      console.error('Error al enviar la solicitud', error);
    }
  }


  console.log("estado :",state);

  const eliminarSolicitud = async () => {
    try {
      const response = await axios.delete('/eliminar-solicitud', {
        //Agregar parametro para identificar lo que se elimina
      });
      console.log(response.data);
      setSolicitudPendiente(true);
    } catch (error) {
      console.log(error);
    }
  };
  

  console.log("Quien envia la solicitud :" ,state.user.ID_USER);
  console.log("Quien la recibe :",student.user.ID_USER);

  return (
  <>
    <div className="mt-10 mx-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div className="md:flex">
    <div className="md:flex">
      <img className="object-cover md:w-48" /* src={student.PROFILE_PHOTO
} */ alt="Imagen de perfil" />
    </div>
    <div className="p-8">
      <div className="uppercase tracking-wide text-lg font-bold text-indigo-500">{student.user.NAME}</div>
      <p className="mt-2 text-gray-500 text-lg"><span className='font-bold text-gray-700'>Carrera: </span>{student.CAREER}</p>
      <p className="mt-2 text-gray-500 text-lg"><span className='font-bold text-gray-700'>Correo: </span>{student.user.EMAIL}</p>
      <p className="mt-2 text-gray-500 text-lg"><span className='font-bold text-gray-700'>Centro de Estudio: </span>{student.user.CENTER}</p>
      <p className="mt-2 text-gray-500 text-lg"><span className='font-bold text-gray-700'>Numero de Cuenta: </span>{student.user.ACCOUNT_NUMBER}</p>
      <div className="mt-4">
        {solicitudPendiente ? (
          <input className={'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer'} value="Enviar Solicitud" type="submit" onClick={enviarSolicitudContacto}/>
        ):(
          <input className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer' value="X Eliminar Solicitud" type="submit" onClick={eliminarSolicitud}/>
        )}
      </div>
    </div>
  </div>
</div>
  </>
  )
}

export default CardTeachers