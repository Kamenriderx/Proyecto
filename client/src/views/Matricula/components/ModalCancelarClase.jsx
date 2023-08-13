const ModalCancelarClase = ({ isOpen, onClose, enviarDatoAlPadre }) => {
  if (!isOpen) {
    return null;
  }

  //Enviar datos a componente Padre: TablaMatricula
  const handleClick = (res) => {
    enviarDatoAlPadre(res);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <p className="font-bold text-xl mb-4">¿Cancelar clase?</p>
        <div className="flex justify-around">
          <button
            onClick={() => handleClick(true)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md "
          >
            Si
          </button>

          <button
            onClick={() => handleClick(false)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCancelarClase;
