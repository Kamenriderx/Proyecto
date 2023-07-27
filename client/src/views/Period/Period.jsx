import { useState } from "react";
import Notification from "./components/Notification";
import PeriodTable from "./components/PeriodTable";
import PeriodForm from "./components/PeriodTable";
import Swal from "sweetalert2";
import Modal from "../../components/Modal";

const Period = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-1/2">
      <div className="flex min-w-full justify-between mb-4 items-center align-middle">
        <button
          onClick={() => setVisible(true)}
          className="bg-lime-400 text-white w-20 rounded-md h-6"
        >
          Nuevo
        </button>
        <select name="years" id="years" className="w-20 h-6 rounded-md w">
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
      <PeriodTable />

      <Modal Visible={visible} Close={setVisible}>
        <div className="">
          <div className="">
            <fieldset className="border p-2 rounded-lg">
              <legend className="text-base  items-center font-medium mb-2 justify-center">
                Fecha inicio
              </legend>
              <input type="date" />
            </fieldset>
            <fieldset className="border p-2 rounded-lg">
              <legend className="text-base  items-center font-medium mb-2 justify-center">
                Fecha fin
              </legend>
              <input type="date" />
            </fieldset>
          </div>
          <div className="flex justify-between mt-5">
          <button
              onClick={() => setVisible(true)}
              className="bg-red-600 text-white w-20 rounded-md h-6"
            >
              Descartar
            </button>
            
            <button
              onClick={() => setVisible(true)}
              className="bg-lime-400 text-white w-20 rounded-md h-6"
            >
              Crear
            </button>
            
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Period;
