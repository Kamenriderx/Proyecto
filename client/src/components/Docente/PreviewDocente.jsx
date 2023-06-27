import {Link} from 'react-router-dom'

const PreviewDocente = ({docente}) => {
  return (
    <div className='border-b p-5 flex'>
    <p className='flex-1'>Nombre <span className='text-sm text-gray-500 uppercase'>{' '} Descripcion</span> </p>    

    <Link className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold' /* to={`${_id}`} */>Ver Docente</Link>
</div>
  )
}

export default PreviewDocente