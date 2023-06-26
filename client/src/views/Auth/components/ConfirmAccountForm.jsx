import { GiLynxHead } from "react-icons/gi";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import { useState } from "react";

const ConfirmAccountForm = () => {
  const [accountNumber, setAccountNumber] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setAccountNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regularExpression = /^\d{11}$/;
    if(!regularExpression.test(accountNumber)){
      alert("El numero de cuenta ingresado no es valido");
      return;
    }

    const response = await httpRequests()["put"](
      `http://localhost:3000/registro/resetPassword/sendRestoreEmail/${accountNumber}`,
      {}
    );
    if(response.status === 200){
      alert(response.data.message);
    }else{
      alert("Algo salio mal");

    }
  };
  return (
    <form
      action=""
      className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex-col items-center space-x-4 animate__zoomIn animate__animated"
    >
      <div className="flex flex-row justify-center items-center mb-3">
        <GiLynxHead style={{ width: "40px", height: "40px" }} />
        <h2
          className="text-gray-800 text-xl font-bold text-center flex items-center"
          htmlFor="email"
        >
          Portal East High
        </h2>
      </div>
      <div className="text-center space-y-2 sm:text-left">
        <label
          className="block text-gray-300 text-sm font-bold mb-2 text-center"
          htmlFor="email"
        >
          Solicitar contraseña
        </label>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="accountNumber"
            type="text"
            placeholder="Numero de cuenta"
            value={accountNumber}
            onChange={handleChange}
            name="accountNumber"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-md border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2  mt-5 w-full"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ConfirmAccountForm;
