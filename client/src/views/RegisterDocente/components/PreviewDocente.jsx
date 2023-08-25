import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import FormularioDocente from "./FormularioDocente";
import Modal from "../../../components/Modal";
import { useState } from "react";
import axios from "axios";

const PreviewDocente = ({ docente }) => {
  const [docenteToEdit, setDocenteToEdit] = useState(null);
  const [showModal1, setShowModal1] = useState(false);
  const handleEdit = (docente) => {
    setDocenteToEdit(docente);
    setShowModal1(true);
  };
  console.log("DOCENTE EDIT", docenteToEdit);

  console.log("docente:", docente);

  const deleteTeacher = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/registro/admin/deleteProfessor/${id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal Visible={showModal1} Close={() => setShowModal1(false)}>
        {docenteToEdit && <FormularioDocente docente={docenteToEdit} />}
      </Modal>
      <tr className="border-b">
        <td className="border px-4 py-2 text-lg font-bold r">
          {docente.user.NAME}
        </td>
        <td className="border px-4 py-2 text-lg font-bold r">
          {docente.CAREER}
        </td>
        <td className="border px-4 py-2 text-lg font-bold r">
          {docente.user.CENTER}
        </td>
        <td className="border px-4 py-2 text-lg font-bold r">
          {docente.user.ACCOUNT_NUMBER}
        </td>
        <td className="border px-4 py-2 text-lg font-bold r">
          {docente.user.EMAIL}
        </td>
        <td className="border px-4 py-2 text-lg font-bold r">
          {docente.user.rol.ROLE_NAME}
        </td>
        <td className="gap-1 flex flex-row">
          <div className="cursor-pointer px-4 py-2 text-2xl font-bold">
            <FiEdit onClick={() => handleEdit(docente)} />
          </div>
          <div className="cursor-pointer px-4 py-2 text-2xl font-bold">
            <AiFillDelete
              onClick={() => deleteTeacher(docente.ID_PROFFERSSOR)}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default PreviewDocente;
