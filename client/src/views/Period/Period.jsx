import { useState } from "react";
import PeriodTable from "./components/PeriodTable";
import PeriodForm from "./components/PeriodTable";
import Swal from "sweetalert2";
import Modal from "../../components/Modal";
import { httpRequests } from "../../utils/helpers/httpRequests";

const Period = () => {
  const [visible, setVisible] = useState(false);
  const actualYear = (new Date()).getFullYear().toString();
  const [state, setState] = useState({
    initDate: "",
    finalDate: "",
    selectedYear: actualYear
  });


  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () =>{
    httpRequests()["post"]("http://localhost:3000/registro/periodAcademic",{ body:{startDate:state.initDate,finishDate:state.finalDate}}).
    then(res=>console.log(res));

  }

  return (
    <div className="flex w-full justify-center p-3 m-3">
      <div className="w-2/3">
        <div className="flex min-w-full justify-between mb-4 items-center align-middle">
          <button
            onClick={() => setVisible(true)}
            className="bg-lime-400 text-white w-20 rounded-md h-6"
          >
            Nuevo
          </button>
          <select name="selectedYear" value = {state.selectedYear} id="years" onChange={handleChange} className="w-25 h-9 rounded-md w">
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
                <input
                  type="date"
                  name="initDate"
                  value={state.initDate}
                  onChange={(event) => handleChange(event)}
                />
              </fieldset>
              <fieldset className="border p-2 rounded-lg">
                <legend className="text-base  items-center font-medium mb-2 justify-center">
                  Fecha fin
                </legend>
                <input
                  type="date"
                  name="finalDate"
                  value={state.finalDate}
                  onChange={(event) => handleChange(event)}
                />
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
                onClick={() => {
                  setVisible(false);
                  Swal.fire("Creado!", "El periodo ha sido creado", "success");
                  handleSubmit();
                }}
                className="bg-lime-400 text-white w-20 rounded-md h-6"
              >
                Crear
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Period;
