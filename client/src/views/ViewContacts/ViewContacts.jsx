import { BiSearch } from "react-icons/Bi";
import ManagementContact from "./components/ManagementContact";

const ViewContacts = () => {
  return (
    <div>
      <div>
        <button className="w-12 h-12 cursor-pointer hover:bg-gray-200 flex justify-center items-center rounded-s-md">
          <BiSearch />
        </button>
        <input type="text" placeholder="Buscar" className=" border border-none placeholder:text-center"/>
      </div>
      <div>
        <ManagementContact/>

      </div>
    </div>
  );
};

export default ViewContacts;
