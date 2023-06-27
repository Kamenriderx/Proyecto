
import {useState} from 'react'
import FormularioDocente from "../../components/Docente/FormularioDocente"
/* import PreviewDocente from '../../components/Docente/PreviewDocente' */
import Modal from "../../components/Modal"


const Docentes = () => {

  const [showModal, setShowModal] = useState(false)

  /* const {docentes} = useDocentes(); */
    
  return (
    <>
    <div className="md:flex md:justify-normal gap-40 h-auto">
    <button className="bg-sky-600 hover:bg-sky-900 text-center text-white shadow p-2 border transition-colors uppercase font-bold text-lg rounded-md" onClick={()=>setShowModal(true)}>Registrar Docente</button>
    <Modal Visible={showModal} Close={()=>setShowModal(false)}>
            <div className="p-4">
                <FormularioDocente/>
            </div>
      </Modal>
    <h1 className='text-4xl font-black text-center'>Docentes</h1>
    </div>
      <div className="bg-white shadow rounded-md p-5 mt-10">
     {/*  {docentes.length  ? docentes.map(docente=>(
          <PreviewDocente docente={docente} key={docente.id}/>
        )): */}
      <p className="text-2xl text-center uppercase font-bold ">No hay Docentes Inscritos Aun</p>{/* } */}
      </div>
    </>
  )
}

export default Docentes