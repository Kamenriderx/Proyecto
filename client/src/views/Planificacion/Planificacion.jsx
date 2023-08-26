import Modal from "../../components/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineBackward,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AlertTwo from "../../components/AlertTwo";
import Modal3 from "../../components/Modal3";
import Modal2 from "../../components/Modal2";
import { format } from "date-fns";
import es from "date-fns/locale/es";

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
  const [alerta, setalerta] = useState({});
  const [showModal1, setShowModal1] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [regisStartDate, setRegisStartDate] = useState("");
  const [regisEndDate, setRegisEndDate] = useState("");
  const [labStartDate, setLabStartDate] = useState("");
  const [labEndDate, setLabEndDate] = useState("");
  const [dateSelected, setDateSelected] = useState(null);
  const [id, setId] = useState("");
  const [showModal2, setShowModal2] = useState(false);
  const [peri, setperi] = useState([]);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  function mostrarFecha(fechaOriginal) {
    const fechaObjeto = new Date(fechaOriginal);
    const nombreMes = format(fechaObjeto, "MMMM", { locale: es });
    const dia = format(fechaObjeto, "d");
    const ano = format(fechaObjeto, "yyyy");
    const fechaFormateada = `${dia} de ${nombreMes} de ${ano}`;
    return fechaFormateada;
  }

  const handleClose = () => {
    setShowModal(false);
    setFinishDate("");
    setStartDate("");
    setFinishDate1("");
    setStartDate1("");
    setFinishDate2("");
    setStartDate2("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleEdit = (solicitud) => {
    console.log("SOLICITUDES DE LA MODAL", solicitud);
    setShowModal1(true);
    setDateSelected(solicitud);
    setEndDate(
      formatDate(solicitud.details.map((fecha) => fecha.CLASS_END_DATE))
    );
    setRegisStartDate(
      formatDate(
        solicitud.details.map((fecha) => fecha.REGISTRATION_PAYMENT_START_DATE)
      )
    );
    setRegisEndDate(
      formatDate(
        solicitud.details.map((fecha) => fecha.REGISTRATION_PAYMENT_END_DATE)
      )
    );
    setLabStartDate(
      formatDate(
        solicitud.details.map((fecha) => fecha.LABORATORIES_PAYMENT_START_DATE)
      )
    );
    setLabEndDate(
      formatDate(
        solicitud.details.map((fecha) => fecha.LABORATORIES_PAYMENT_END_DATE)
      )
    );
    setId(solicitud.period.ID_PERIOD);
  };

  const clearStates = () => {
    setEndDate("");
    setRegisStartDate("");
    setRegisEndDate("");
    setLabStartDate("");
    setLabEndDate("");
    setId("");
  };

  const showModalClear = () => {
    setShowModal1(false);
    setDateSelected(null);
    clearStates();
  };

  const handleClick = () => {
    showModalClear();
    clearStates();
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
      setalerta({
        message: error.response.data.error,
        error: true,
      });
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
      setalerta({
        message: error.response.data.error,
        error: true,
      });
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
      setalerta({
        message: error.response.data.error,
        error: true,
      });
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
      setalerta({
        message: "Periodo Eliminado Exitosamente",
        error: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const formattedEndDate = new Date(
        `${endDate}T23:59:59.000Z`
      ).toISOString();
      const formattedRegisStartDate = new Date(
        `${regisStartDate}T23:59:59.000Z`
      ).toISOString();
      const formattedRegisEndDate = new Date(
        `${regisEndDate}T23:59:59.000Z`
      ).toISOString();
      const formattedLabStartDate = new Date(
        `${labStartDate}T23:59:59.000Z`
      ).toISOString();
      const formattedLabEndDate = new Date(
        `${labEndDate}T23:59:59.000Z`
      ).toISOString();

      const response = await axios.put(
        `http://localhost:3000/registro/periodAcademic/editPeriod/${id}`,
        {
          details: {
            CLASS_END_DATE: formattedEndDate,
            REGISTRATION_PAYMENT_START_DATE: formattedRegisStartDate,
            REGISTRATION_PAYMENT_END_DATE: formattedRegisEndDate,
            LABORATORIES_PAYMENT_START_DATE: formattedLabStartDate,
            LABORATORIES_PAYMENT_END_DATE: formattedLabEndDate,
          },
        }
      );

      // Update the estado states accordingly, you can use a switch statement if you have multiple periods.

      console.log(response);
      toast.success("Fechas actualizadas exitosamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      setalerta({
        message: error.response.data.error,
        error: true,
      });
    }
  };

  const getPeriodo = async (id) => {
    try {
      const response = await axios(
        `http://localhost:3000/registro/periodAcademic/period/${id}`
      );
      setperi(response.data.details);
      console.log(response.data.details);
    } catch (error) {
      console.log(error);
    }
  };

  const verPeriodo = (id) => {
    setShowModal2(true), getPeriodo(id);
  };

  const { message } = alerta;

  return (
    <div className="container mx-auto">
      {message && <AlertTwo alerta={alerta} />}
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
      <Modal3 Visible={showModal1} Close={handleClick}>
        <div className="mt-3">
          <ToastContainer position="top-right" />
          <form
            onSubmit={handleSubmitEdit}
            className="bg-white shadow-md rounded-sm p-2"
          >
            <div className="mt-2 text-center">
              <p className="text-red-800 font-black text-2xl">
                Edicion de Fechas
              </p>
            </div>
            <div className="mt-3 flex text-center justify-around">
              <div className="mt-3">
                <p className="text-gray-800 text-sm font-bold">
                  Fecha de Finalizacion de Clases
                </p>
                <div>
                  <div className="mt-2 block">
                    <p className="text-gray-800 text-sm font-semibold">
                      Fecha Final de Clases
                    </p>
                    <input
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      type="date"
                      className="py-2 px-4 rounded shadow"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-gray-800 text-sm font-bold">
                  Fechas de pago de Matricula
                </p>
                <div className="mt-2 flex gap-3 justify-around">
                  <div>
                    <div className="block">
                      <p className="text-gray-800 text-sm font-semibold">
                        Incio Pago de Matricula
                      </p>
                      <input
                        value={regisStartDate}
                        onChange={(e) => setRegisStartDate(e.target.value)}
                        type="date"
                        className="py-2 px-4 rounded shadow"
                      />
                    </div>
                  </div>
                  <div className="block">
                    {" "}
                    <p className="text-gray-800 text-sm font-semibold">
                      Fin Pago de Matricula
                    </p>
                    <input
                      value={regisEndDate}
                      onChange={(e) => setRegisEndDate(e.target.value)}
                      type="date"
                      className="py-2 px-4 rounded shadow"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-gray-800 text-sm font-bold">
                  Fechas de Pago de Laboratorios
                </p>
                <div className="mt-2 flex gap-3 justify-around">
                  <div className="block">
                    <p className="text-gray-800 text-sm font-semibold">
                      Inicio Pago de Laboratorios
                    </p>
                    <input
                      value={labStartDate}
                      onChange={(e) => setLabStartDate(e.target.value)}
                      type="date"
                      className="py-2 px-4 rounded shadow"
                    />
                  </div>
                  <div className="block">
                    {" "}
                    <p className="text-gray-800 text-sm font-semibold">
                      Fin Pago de Laboratorios
                    </p>
                    <input
                      value={labEndDate}
                      onChange={(e) => setLabEndDate(e.target.value)}
                      type="date"
                      className="py-2 px-4 rounded shadow"
                    />
                  </div>
                </div>
              </div>
              <div className="items-center flex">
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white text-lg font-bold p-2 px-3 shadow rounded"
                >
                  Editar
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal3>
      <Modal2 Visible={showModal2} Close={() => setShowModal2(false)}>
        <div className="bg-gray-100 shadow rounded p-2">
          {peri.map((per) => (
            <div key={per.ID_PERIOD}>
              <div className="mt-3">
                <div className="text-center">
                  <p className="text-red-800 text-xl font-bold">
                    Fechas importantes del año {anyo}
                  </p>
                  <div className="mt-2">
                    <p className="text-gray-900 font-bold text-lg">
                      Inicio de Clases
                    </p>
                    <p className="text-gray-700 font-semibold text-base">
                      Del {mostrarFecha(per.CLASS_START_DATE)} al{" "}
                      {mostrarFecha(per.CLASS_END_DATE)}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-900 font-bold text-lg">
                      Pago de Matricula
                    </p>
                    <p className="text-gray-700 font-semibold text-base">
                      Del {mostrarFecha(per.REGISTRATION_PAYMENT_START_DATE)} al{" "}
                      {mostrarFecha(per.REGISTRATION_PAYMENT_END_DATE)}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-900 font-bold text-lg">
                      Pago de Laboratorios
                    </p>
                    <p className="text-gray-700 font-semibold text-base">
                      Del {mostrarFecha(per.LABORATORIES_PAYMENT_START_DATE)} al{" "}
                      {mostrarFecha(per.NOTES_UPLOAD_REGISTRATION_END_DATE)}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-900 font-bold text-lg">
                      Prematricula
                    </p>
                    <p className="text-gray-700 font-semibold text-base">
                      Del {mostrarFecha(per.PREREGISTRATION_START_DATE)} al{" "}
                      {mostrarFecha(per.PREREGISTRATION_END_DATE)}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-900 font-bold text-lg">Matricula</p>
                    <p className="text-gray-700 font-semibold text-base">
                      Del {mostrarFecha(per.REGISTRATION_START_DATE)} al{" "}
                      {mostrarFecha(per.REGISTRATION_END_DATE)}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-900 font-bold text-lg">
                      Adiciones y Cancelaciones
                    </p>
                    <p className="text-gray-700 font-semibold text-base">
                      Del {mostrarFecha(per.ADD_CANCELLATIONS_START_DATE)} al{" "}
                      {mostrarFecha(per.ADD_CANCELLATIONS_END_DATE)}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-900 font-bold text-lg">
                      Subida de Notas
                    </p>
                    <p className="text-gray-700 font-semibold text-base">
                      Del{" "}
                      {mostrarFecha(per.NOTES_UPLOAD_REGISTRATION_START_DATE)}{" "}
                      al {mostrarFecha(per.NOTES_UPLOAD_REGISTRATION_END_DATE)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal2>
      <div className="w-3/4 mx-auto">
        <div className="flex justify-start">
          <div className="mt-5">
            <button
              onClick={handleBack}
              className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
            >
              <AiOutlineBackward color="#F7F9F7" />
            </button>
          </div>
        </div>
        <div className="mt-5 justify-center flex">
          <p className="text-red-800 font-bold text-4xl mt-5">
            Planificacion de Periodo Academico
          </p>
        </div>
        <div className="mt-10 flex justify-between">
          <div className="">
            <button
              onClick={() => setShowModal(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white text-lg font-bold p-2 px-3 shadow rounded"
            >
              Nuevo
            </button>
          </div>
          <div>
            <select
              className="focus:border-sky-600 rounded"
              value={anyo}
              onChange={(e) => setAnyo(e.target.value)}
            >
              <option value="">-- Selecciona el Año --</option>
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
                  <tr className="border-b" key={solicitudes.period.ID_PERIOD}>
                    <td className="border px-4 py-2 text-sm font-semibold r">
                      {solicitudes.period.PERIOD_NAME}
                    </td>
                    <td className="border px-4 py-2 text-sm font-semibold r">
                      {solicitudes.period.STATUS}
                    </td>
                    <td className="border py-2 text-lg font-medium r">
                      <div className="flex items-center gap-2">
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
                            onClick={() => handleEdit(solicitudes)}
                            size={20}
                          ></AiFillEdit>
                          <span className="-mx-1 text-xs">Editar</span>
                        </div>
                        <div className="mx-auto">
                          <AiFillEye
                            onClick={() =>
                              verPeriodo(solicitudes.period.ID_PERIOD)
                            }
                            className="cursor-pointer text-gray-600"
                            size={20}
                          ></AiFillEye>
                          <span className="text-xs">Ver</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center mt-20">
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
