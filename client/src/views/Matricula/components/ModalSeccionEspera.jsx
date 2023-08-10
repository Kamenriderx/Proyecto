const ModalSeccionEspera = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <div className="mb-4 font-bold text-lg">
          Sección llena ¿Matricular en espera?
        </div>
        <div className="mb-4">
          <select
            id="years"
            size="5"
            className="bg-gray-50 text-gray-900 text-md w-full border-none focus:border-none focus:ring-0"
          >
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
          </select>
        </div>

        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md "
          >
            Matricular
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSeccionEspera;
