import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

const PreviewDocente = ({ docente }) => {
  console.log("docente:", docente);
  return (
    <>
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
            <FiEdit />
          </div>
          <div className="cursor-pointer px-4 py-2 text-2xl font-bold">
            <AiFillDelete />
          </div>
        </td>
      </tr>
    </>
  );
};

export default PreviewDocente;
