import { useEffect, useState } from "react";
import FormularioDocente from "./components/FormularioDocente";
/* import PreviewDocente from '../../components/Docente/PreviewDocente' */
import Modal from "../../components/Modal";
import useAxios from "../../utils/hooks/useAxios";
import PreviewDocente from "./components/PreviewDocente";
import axios from "axios";

const Docentes = () => {
  const [showModal, setShowModal] = useState(false);
  const [docentes, setDocentes ] = useState({});
  const [check,setCheck] = useState(false);
  useEffect(() => {
    const axiosCall = async () => {
      const res = await axios("http://localhost:3000/registro/getProfessors");
      console.log(res);
      console.log(res.data.professors);
      setDocentes(res.data.professors);
    };
    axiosCall();
  }, [check]);
  return (
    <>
      <h3 style={{ color: "white" }}>Hola</h3>
      <div className="md:flex md:justify-normal gap-40 h-auto">
        <button
          className="bg-sky-600 hover:bg-sky-900 text-center text-white shadow p-2 border transition-colors uppercase font-bold text-lg rounded-md"
          onClick={() => setShowModal(true)}
        >
          Registrar Docente
        </button>
        <Modal Visible={showModal} Close={() => setShowModal(false)}>
          <div className="p-4">
            <FormularioDocente setCheck= {setCheck} check={check}/>
          </div>
        </Modal>
        <h1 className="text-4xl font-black text-center">Docentes</h1>
      </div>
      <div className="bg-white shadow rounded-md p-5 mt-10">
        {docentes?.length>0  ? docentes?.map(docente=>(
          <PreviewDocente docente={docente} key={docentes.ID_PROFFERSSOR}/>
        )):
        <p className="text-2xl text-center uppercase font-bold ">
          No hay Docentes Inscritos Aun
        </p>
         } 
      </div>
    </>
  );
};

export default Docentes;
