const FormCarrera = () => {
  return (
    <form className="py-3 px-2 bg-white shadow rounded-md mt-5">
      <div className="">
        <p className="font-semibold text-md">
          Seleccione la Carrera a la cual desea hacer el Cambio:
        </p>
      </div>
      <div className="appearance-none mx-auto w-2/3 h-auto border border-gray-300 mt-5">
        <select className="block appearance-none w-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500">
          <option>Option 1</option>
        </select>
      </div>
      <div className="mt-5">
        <p className="font-semibold text-md">
          Razones por las Cuales desea realizar el cambio :
        </p>
      </div>
      <div className="mt-5 mx-auto w-2/3 h-36">
        <textarea className="appearance-none w-full h-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mt-5">
        <p className="font-semibold text-md">Comprobante de Pago:</p>
      </div>
      <div className="mt-2 mx-auto w-2/3 ">
        <input
          type="file"
          accept="application/pdf"
          className="w-full py-2 px-3"
        />
      </div>
      <div className="mt-5 flex justify-around">
        <div>
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 rounded-md shadow">
            Realizar solicitud
          </button>
        </div>
        <div>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-10 rounded-md shadow">
            Salir
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormCarrera;
