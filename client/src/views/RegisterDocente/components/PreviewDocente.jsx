import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

const PreviewDocente = ({docente}) => {

  console.log("docente:" ,docente);
  return (
    <>
       <tr className="border-b">
        <td className="border px-4 py-2 text-xl font-bold r">{docente.user.NAME}</td>
        <td className="border px-4 py-2 text-xl font-bold r">{docente.CAREER}</td>
        <td className="border px-4 py-2 text-xl font-bold r">{docente.user.ACCOUNT_NUMBER}</td>
        <td className="border px-4 py-2 text-xl font-bold r">{docente.user.EMAIL}</td>
        <td className="border px-4 py-2 text-xl font-bold r">{docente.user.rol.ROLE_NAME}</td>
        <div className="gap-1">
        <td className="cursor-pointer px-4 py-2 text-2xl font-bold"><FiEdit/></td>
        <td className="cursor-pointer px-4 py-2 text-2xl font-bold"><AiFillDelete/></td>
        </div>
</tr>
    </>
      )
}

export default PreviewDocente