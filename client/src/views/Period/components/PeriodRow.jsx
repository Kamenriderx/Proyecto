import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsArrowRightCircle } from "react-icons/bs";
import Swal from "sweetalert2";

const PeriodRow = (props) => {
  const [hover, setHover] = useState(false);
  console.log("Las props:",props);
  const showAlert = () => {
    Swal.fire({
        title: `¿Borrar ${props.periodName}?`,
        text: "No podras revertirlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar',
        cancelButtonText:"Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El periodo ha sido eliminado',
            'success'
          )
        }
      })
  };

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="border border-gray-200  hover:bg-gray-200 cursor-pointer rounded-xl p-2 m-1 bg-white"
    >
      <ul className="list-none flex flex-row min-w-ful">
        <li className="flex justify-center items-center w-1/3 ">
          {props.section.course.CODE_COURSE}
        </li>
        <li
          className={`flex justify-center items-center w-1/3 ${
            props.state === "En curso" ? "text-lime-400" : ""
          }`}
        >
          {props.section.course.NAME}
        </li>
        <li className="w-1/3  flex justify-center items-center">
          {props.section.SECTION_CODE}
          
        </li>
      </ul>
    </li>
  );
};

export default PeriodRow;
