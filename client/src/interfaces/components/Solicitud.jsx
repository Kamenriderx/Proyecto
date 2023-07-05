import { FiBell } from 'react-icons/fi';
import {useState} from 'react'
import Modal from '../../components/Modal';
import {StoreContext} from '../../store/ContextExample'

const Solicitud = ({numSolicitudes=12}) => {


  const [showModal, setShowModal] = useState(false);
  const [check,setCheck] = useState(false);


  return (
    <div className=" relative">
    <FiBell className="h-16 w-6 text-gray-500 cursor-pointer" onClick={() => setShowModal(true)}/>
    {numSolicitudes > 0 && (
      <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center w-5 h-5">
        {numSolicitudes}
      </span>
    )}
    <Modal Visible={showModal} Close={() => setShowModal(false)}>
    <div className="p-4">
          <form className='bg-white rounded-lg p-3 shadow' setCheck={setCheck} check={check}>
            <h1>La Cantiadad de Solicitudes seria la siguiente :</h1>
            <p>{numSolicitudes}</p>
          </form>
    </div>
    </Modal>
  </div>
  )
  {/* <FormularioDocente setCheck= {setCheck} check={check}/> */}
}

export default Solicitud