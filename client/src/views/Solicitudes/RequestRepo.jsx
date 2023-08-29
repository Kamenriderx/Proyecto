import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertTwo from "../../components/AlertTwo";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const RequestRepo = () => {
  const [showModal, setShowModal] = useState(false);
  const [JUSTIFY, setJUSTIFY] = useState("");
  const [pago, setPago] = useState([]);
  const [check, setCheck] = useState(false);
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/registro/request/requestPaymentReplacements",
        { JUSTIFY: JUSTIFY },
        config
      );
      console.log(response);
      toast.success("Solicitud Enviada Exitosamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCheck(!check);
      setJUSTIFY("");
    } catch (error) {
      setAlerta({
        message: error.response.data.messagge,
        error: true,
      });
    }
  };

  useEffect(() => {
    const getPago = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios(
          "http://localhost:3000/registro/request/getMyRequestPaymentReplacements",
          config
        );
        setPago(response.data.request);
        console.log(response.data.request);
      } catch (error) {
        console.log(error);
      }
    };
    getPago();
  }, [check]);

  const handleClose = () => {
    setShowModal(false);
    setJUSTIFY("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  console.log("SOLICITUDES PAGO MATRICULA", pago);
  const { message } = alerta;

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-start mx-5 mb-5">
        <div className="mt-5">
          <button
            onClick={handleBack}
            className="py-2 px-3 bg-sky-600 hover:bg-sky-700 rounded "
          >
            <BiArrowBack color="#F7F9F7" size={20} />
          </button>
        </div>
      </div>
      {message && <AlertTwo alerta={alerta} />}
      <Modal Visible={showModal} Close={handleClose}>
        <form
          onSubmit={handleSubmit}
          className="py-3 px-2 bg-white shadow rounded-md mt-5"
        >
          <ToastContainer position="top-right" />
          <div className="text-center">
            <p className="text-red-800 font-bold text-lg">Nueva Solicitud</p>
          </div>
          <div className="mt-5">
            <p className="font-semibold text-md">Escriba una Justificacion :</p>
          </div>
          <div className="mt-5 mx-auto w-3/4 h-36">
            <textarea
              value={JUSTIFY}
              onChange={(e) => setJUSTIFY(e.target.value)}
              className="appearance-none w-full h-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-5 bg-red-50">
            <div className="p-2">
              <p className="text-red-600 font-medium">
                <span className="text-red-800 font-bold">Recuerda:</span> Al
                activar el pago de examen de reposición por medio de la
                plataforma DIPP-UNAH, podrás realizar dicho pago{" "}
                <span className="text-red-800 font-bold">ÚNICAMENTE</span> en
                Banco{" "}
                <span className="text-red-800 font-bold">
                  ATLÁNTIDA, FICOHSA, DAVIVIENDA, BANPAIS,
                </span>{" "}
                y Agencias{" "}
                <span className="text-red-800 font-bold">LAFISE</span> fuera de
                Ciudad Universitaria.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <div>
              <button
                onClick={handleClose}
                className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow"
              >
                Cerrar
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <div className="mt-5">
        <p className="text-red-800 text-lg font-bold">
          Solicitud de activacion de pago de reposicion
        </p>
      </div>
      <div className="mt-5">
        <button
          onClick={() => setShowModal(true)}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 shadow rounded-md"
        >
          Nueva Solicitud
        </button>
      </div>
      <div className="mt-10 mx-auto">
        {pago.length > 0 ? (
          <table className="w-full bg-white shadow-md table-auto">
            <thead className="bg-blue-800 text-white">
              <tr className="">
                <th className="p-2">Solicitud</th>
                <th className="p-2">Fecha de Solicitud</th>
                <th className="p-2">Observacion</th>
                <th className="p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {pago.map((solicitudes) => (
                <tr className="border-b" key={solicitudes.ID_REQUEST}>
                  <td className="border px-4 py-2 text-lg font-semibold r">
                    {/* {solicitudes.student.CAREER} */}II Periodo 2023
                  </td>
                  <td className="border px-4 py-2 text-lg font-semibold r">
                    {formatDate(solicitudes.createdAt)}
                  </td>
                  <td className="border px-4 py-2 text-lg font-semibold r">
                    {solicitudes.JUSTIFY}
                  </td>
                  <td className="border px-4 py-2 text-lg font-semibold r">
                    <div className="justify-center flex">
                      <div className="bg-green-400 p-1 inline-block shadow rounded">
                        <p className="text-white font-semibold">
                          {solicitudes.STATE}
                        </p>
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
              No tienes solicitudes de pago realizadas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestRepo;
