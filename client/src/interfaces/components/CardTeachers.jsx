import {useState,useContext,useEffect} from 'react'
import {StoreContext} from '../../store/ContextExample'
import axios from 'axios'
import useStudents from '../../utils/hooks/useStudents'

const CardTeachers = ({student}) => {

const { state, dispatch } = useContext(StoreContext);
const {pendings} = useStudents()

  const enviarSolicitudContacto= async () => {
    const senderId = `${state.user.ID_USER}`; 
    const recipientId = `${student.user.ID_USER}`
  
    try {
     const res = await axios.post('http://localhost:3000/registro/contacts/contact-requests',{senderId,recipientId})
     console.log("Solicitud Enviada....",res.data);
    } catch (error) {
      console.error('Error al enviar la solicitud', error);
    }
  }

  const eliminarSolicitud = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/registro/contacts/contact-requests/${state.user.ID_USER}/cancel`)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("PENDIENTES",pendings);

/*   const esRemitente = state.user.ID_USER === pendings.senderId;
const esDestinatario = state.user.ID_USER === pendings.recipientId; */

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
      {pendings.length && (
        pendings.map((pending)=>{
          if(pending.status === 'pending' && (pending.senderId===state.user.ID_USER)){
            return(
              <div key={pending.requestId}>
                <input
                      className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer'
                      value="Cancelar Solicitud"
                      type="submit"
                      onClick={() => eliminarSolicitud(pending.requestId)}
                    />
              </div>
            )
          }else if (pending.status === 'accepted' ) {
            return (
              <div key={pending.recipientId}>
                  <input
                className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer'
                value="Ahora somos contacto"
                type="submit"
              />
              </div>
            );
          }else if (pending.status === 'rejected' && (pending.senderId===state.user.ID_USER)) {
            return (
              <div key={pending.requestId}>
                <input
                className={'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer'}
                value="Enviar Solicitud"
                type="submit"
                onClick={enviarSolicitudContacto}
              />
              </div>  
            );
          }else if(pending.status === 'rejected' && (pending.recipientId===state.user.ID_USER)){
            return (
              <div key={pending.requestId}>
                <input
                className={'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer'}
                value="Enviar Solicitud"
                type="submit"
                onClick={enviarSolicitudContacto}
              />
              </div>  
            );
          }else if(pending.status === null){
            return (
              <div key={pending.requestId}>
                <input
                className={'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer'}
                value="Enviar Solicitud"
                type="submit"
                onClick={enviarSolicitudContacto}
              />
              </div>  
            );
          }
         })
      )
       }
      </div>
    </div>
  </div>
</div>
  </>
  )
}

export default CardTeachers