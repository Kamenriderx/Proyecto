import Modal from "../../components/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const Planificacion = () => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [finishDate1, setFinishDate1] = useState("");
  const [startDate2, setStartDate2] = useState("");
  const [finishDate2, setFinishDate2] = useState("");
  const [estado, setEstado] = useState(false);
  const [estado1, setEstado1] = useState(false);
  const [estado2, setEstado2] = useState(false);
  const [periodo, setPeriodo] = useState([]);
  const [anyo, setAnyo] = useState("");
  const [check, setCheck] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setFinishDate("");
    setStartDate("");
    setFinishDate1("");
    setStartDate1("");
    setFinishDate2("");
    setStartDate2("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/registro/periodAcademic",
        { startDate: startDate, finishDate: finishDate }
      );
      console.log(response);
      toast.success("Periodo Creado Exitosamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCheck(!check);
      setStartDate("");
      setFinishDate("");
      setEstado(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/registro/periodAcademic",
        {
          startDate: startDate1,
          finishDate: finishDate1,
        }
      );
      console.log(response);
      toast.success("Periodo Creado Exitosamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCheck(!check);
      setStartDate1("");
      setFinishDate1("");
      setEstado1(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/registro/periodAcademic",
        { startDate: startDate2, finishDate: finishDate2 }
      );
      console.log(response);
      toast.success("Periodo Creado Exitosamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCheck(!check);
      setStartDate2("");
      setFinishDate2("");
      setEstado2(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPeriodo = async () => {
      try {
        const response = await axios(
          `http://localhost:3000/registro/periodAcademic/periods/${anyo}`
        );
        setPeriodo(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPeriodo();
  }, [anyo, check]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/registro/periodAcademic/delete/${id}`
      );
      console.log(response);
      setPeriodo((prevPeriodo) =>
        prevPeriodo.filter((periodo) => periodo.period.ID_PERIOD !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log("El periodo es:", periodo);

  return (
    <div className="container mx-auto">
      <Modal Visible={showModal} Close={handleClose}>
        <div className="mt-3">
          <ToastContainer position="top-right" />
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-sm p-2"
          >
            <div className="mt-2">
              <p className="text-red-800 font-bold text-lg">
                Planificacion Periodo I
              </p>
            </div>
            <div className="mt-3 flex justify-around">
              <div>
                <p className="text-black text-sm font-bold">Fecha de Inicio</p>
                <input
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  className="py-2 px-4 rounded shadow"
                />
              </div>
              <div>
                <p className="text-black text-sm font-bold">
                  Fecha de Finalizacion
                </p>
                <input
                  value={finishDate}
                  onChange={(e) => setFinishDate(e.target.value)}
                  type="date"
                  className="py-2 px-4 rounded shadow"
                />
              </div>
              <div className="items-center flex">
                {!estado ? (
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-white text-lg font-bold p-2 px-3 shadow rounded"
                  >
                    Crear
                  </button>
                ) : (
                  " "
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="mt-3">
          <form
            onSubmit={handleSubmit1}
            className="bg-white shadow-md rounded-sm p-2"
          >
            <div className="mt-2">
              <p className="text-red-800 font-bold text-lg">
                Planificacion Periodo II
              </p>
            </div>
            <div className="mt-3 flex justify-around">
              <div>
                <p className="text-black text-sm font-bold">Fecha de Inicio</p>
                <input
                  value={startDate1}
                  onChange={(e) => setStartDate1(e.target.value)}
                  type="date"
                  className="py-2 px-4 rounded shadow"
                />
              </div>
              <div>
                <p className="text-black text-sm font-bold">
                  Fecha de Finalizacion
                </p>
                <input
                  value={finishDate1}
                  onChange={(e) => setFinishDate1(e.target.value)}
                  type="date"
                  className="py-2 px-4 rounded shadow"
                />
              </div>
              <div className="items-center flex">
                {!estado1 ? (
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-white text-lg font-bold p-2 px-3 shadow rounded"
                  >
                    Crear
                  </button>
                ) : (
                  " "
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="mt-3">
          <form
            onSubmit={handleSubmit3}
            className="bg-white shadow-md rounded-sm p-2"
          >
            <div className="mt-2">
              <p className="text-red-800 font-bold text-lg">
                Planificacion Periodo III
              </p>
            </div>
            <div className="mt-3 flex justify-around">
              <div>
                <p className="text-black text-sm font-bold">Fecha de Inicio</p>
                <input
                  value={startDate2}
                  onChange={(e) => setStartDate2(e.target.value)}
                  type="date"
                  className="py-2 px-4 rounded shadow"
                />
              </div>
              <div>
                <p className="text-black text-sm font-bold">
                  Fecha de Finalizacion
                </p>
                <input
                  value={finishDate2}
                  onChange={(e) => setFinishDate2(e.target.value)}
                  type="date"
                  className="py-2 px-4 rounded shadow"
                />
              </div>
              <div className="items-center flex">
                {!estado2 ? (
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-white text-lg font-bold p-2 px-3 shadow rounded"
                  >
                    Crear
                  </button>
                ) : (
                  " "
                )}
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <div className="w-3/4 mx-auto">
        <div className="mt-5 text-center">
          <p className="text-red-800 font-bold text-2xl">
            Planificacion de Periodo Academico
          </p>
        </div>
        <div className="mt-5 flex justify-between">
          <div className="">
            <button
              onClick={() => setShowModal(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white text-lg font-bold p-2 px-3 shadow rounded"
            >
              Nuevo
            </button>
          </div>
          <div>
            <select value={anyo} onChange={(e) => setAnyo(e.target.value)}>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2025">2026</option>
              <option value="2025">2027</option>
              <option value="2025">2028</option>
              <option value="2025">2029</option>
              <option value="2025">2030</option>
            </select>
          </div>
        </div>
        <div className="mt-5 mx-auto">
          {periodo.length > 0 ? (
            <table className="w-full bg-white shadow-md table-auto">
              <thead className="bg-blue-800 text-white">
                <tr className="">
                  <th className="p-2">Periodo</th>
                  <th className="p-2">Estado</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {periodo.map((solicitudes) => (
                  <tr className="border-b" key={solicitudes.ID_REQUEST}>
                    <td className="border px-4 py-2 text-sm font-semibold r">
                      {solicitudes.period.PERIOD_NAME}
                    </td>
                    <td className="border px-4 py-2 text-sm font-semibold r">
                      {solicitudes.period.STATUS}
                    </td>
                    <td className="border px-4 py-2 text-lg font-medium r">
                      <div className="flex items-center gap-8">
                        <div className="mx-auto">
                          <AiFillDelete
                            className="cursor-pointer text-gray-600"
                            onClick={() =>
                              handleDelete(solicitudes.period.ID_PERIOD)
                            }
                            size={20}
                          ></AiFillDelete>
                          <span className="-mx-3 text-xs">Eliminar</span>
                        </div>
                        <div className="mx-auto">
                          <AiFillEdit
                            className="cursor-pointer text-gray-600"
                            /* onClick={() => handleEdit(solicitudes.period.ID_PERIOD
                                )} */
                            size={20}
                          ></AiFillEdit>
                          <span className="-mx-1 text-xs">Editar</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">
              <p className="text-black font-bold text-2xl">
                No hay planificacion para este año
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Planificacion;
