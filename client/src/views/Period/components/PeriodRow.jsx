import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsArrowRightCircle } from "react-icons/bs";
import Swal from "sweetalert2";
const PeriodRow = (props) => {
  const [hover, setHover] = useState(false);
  const showAlert = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
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
          {props.periodName}
        </li>
        <li
          className={`flex justify-center items-center w-1/3 ${
            props.state === "En curso" ? "text-lime-400" : ""
          }`}
        >
          {props.state}
        </li>
        <li className="w-1/3  flex justify-center items-center">
          <div className="w-1/2 flex justify-end">
            <div
              className="w-5 h-5  border  hover:bg-gray-400 cursor-pointer rounded-full flex justify-center items-center "
              onClick={() => showAlert()}
            >
              <AiFillDelete />
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            <div className="w-5 h-5 cursor-pointer flex justify-center items-center">
              {hover && <BsArrowRightCircle />}
            </div>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default PeriodRow;
