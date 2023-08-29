import { useState } from "react";
import PeriodTable from "./components/PeriodTable";
import PeriodForm from "./components/PeriodTable";
import Swal from "sweetalert2";
import Modal from "../../components/Modal";
import { httpRequests } from "../../utils/helpers/httpRequests";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const Period = () => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    initDate: "",
    finalDate: "",
    selectedYear: "I",
  });

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    httpRequests()
      ["post"]("http://localhost:3000/registro/periodAcademic", {
        body: { startDate: state.initDate, finishDate: state.finalDate },
      })
      .then((res) => console.log(res));
  };

  return (
    <div className="flex w-full justify-center p-3 m-3">
      <div className="flex justify-start">
        <div className="mt-5">
          <button
            onClick={handleBack}
            className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
          >
            <BiArrowBack color="#F7F9F7" size={20} />
          </button>
        </div>
      </div>
      <div className="w-2/3">
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
