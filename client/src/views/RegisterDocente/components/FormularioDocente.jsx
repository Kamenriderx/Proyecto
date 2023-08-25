import { useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import AlertTwo from "../../../components/AlertTwo";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import { useEffect } from "react";
import axios from "axios";

const FormularioDocente = ({ check, setCheck, docente }) => {
  const [NAME, setNAME] = useState("");
  const [CENTER, setCENTER] = useState("");
  const [ROL, setROL] = useState("");
  const [CARRER, setCARRER] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [IMAGE, setIMAGE] = useState(null);
  const [alerta, setAlerta] = useState({});
  const [selectedD, setselectedD] = useState(null);
  const [idP, setIdP] = useState("");

  useEffect(() => {
    if (docente) {
      setIdP(docente.ID_USER);
      setselectedD(docente);
      setNAME(docente.user.NAME);
      setCENTER(docente.user.CENTER);
      setROL(docente.user.rol.ID_ROLE);
      setCARRER(docente.CAREER);
      setEMAIL(docente.user.EMAIL);
    }
  }, [docente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let regexNombbre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if ([NAME, CENTER, ROL, CARRER, EMAIL].includes("")) {
      setAlerta({ message: "Todos los campos son obligatoios", error: true });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    if (!regexEmail.test(EMAIL.trim())) {
      setAlerta({
        message:
          'El campo "correo docente" es invalido, ejem: alguien@algunlugar.es',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    if (!regexNombbre.test(NAME.trim())) {
      setAlerta({
        message:
          'El campo "nombre docente" solo acepta letras y espacios en blanco',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append("NAME", NAME);
      formData.append("CENTER", CENTER);
      formData.append("CAREER", CARRER);
      formData.append("ROLE", ROL);
      formData.append("EMAIL", EMAIL);
      formData.append("file", IMAGE);

      const res = await httpRequests()["post"](
        "http://localhost:3000/registro/admin/registerProfessor",
        { body: formData, ...config }
      );
      console.log(res);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
      setAlerta({
        message: "Docente Creado Correctamente",
        error: false,
      });
      setCheck(!check);
      setNAME("");
      setCENTER("");
      setCARRER("");
      setROL("");
      setEMAIL("");
      setIMAGE(null);
    } catch (error) {
      console.log(error);
      setAlerta({
        message: error.message,
        error: true,
      });
      return;
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    let regexNombbre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (!regexEmail.test(EMAIL.trim())) {
      setAlerta({
        message:
          'El campo "correo docente" es invalido, ejem: alguien@algunlugar.es',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    if (!regexNombbre.test(NAME.trim())) {
      setAlerta({
        message:
          'El campo "nombre docente" solo acepta letras y espacios en blanco',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `http://localhost:3000/registro/admin/updateProfessor/${idP}`,
        { body: { NAME, CENTER, CARRER, ROL, EMAIL }, ...config }
      );
      console.log(res);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
      setAlerta({
        message: "Docente Actualizado Correctamente",
        error: false,
      });
      setCheck(!check);
      setNAME("");
      setCARRER("");
      setCENTER("");
      setROL("");
      setEMAIL("");
    } catch (error) {
      console.log(error);
      setAlerta({
        message: error.message,
        error: true,
      });
      return;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    const validationImage = ["image/jpeg", "image/png"];

    if (!validationImage.includes(fileType)) {
      setAlerta({
        message: 'El archivo seleccionado no es imagen de tipo "jpeg" o "png"',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    setIMAGE(file);
    console.log(file);
  };

  const { message } = alerta;
  return (
    <>
      <form
        onSubmit={selectedD ? handleSubmit2 : handleSubmit}
        className=" bg-white p-5 shadow rounded-lg"
      >
        {message && <AlertTwo alerta={alerta} />}
        <div className="my-3">
          <FaUserTie className="mx-auto text-4xl" />
        </div>
        <div className="my-3">
          <label
            className="uppercase text-gray-800 block text-sm font-bold"
            htmlFor="nombre"
          >
            Nombre Docente
          </label>
          <input
            onChange={(e) => setNAME(e.target.value)}
            value={NAME}
            type="text"
            placeholder="Escribe tu Nombre"
            className="w-full mt-2 p-2 border rounded-xl bg-gray-50"
            id="nombre"
          />
        </div>

        <div className="my-3">
          <label
            className="uppercase text-gray-800 block text-sm font-bold"
            htmlFor="email"
          >
            Correo Docente
          </label>
          <input
            value={EMAIL}
            onChange={(e) => setEMAIL(e.target.value)}
            type="text"
            placeholder="Escribe el Correo del Docente"
            className="w-full mt-2 p-2 border rounded-xl bg-gray-50 "
            id="email"
          />
        </div>
        <div className="my-3">
          <label className="uppercase text-gray-800 block text-sm font-bold">
            Centro del Docente
          </label>
          <select
            value={CENTER}
            onChange={(e) => setCENTER(e.target.value)}
            className="w-full mt-2 p-2 border rounded-xl bg-gray-50 text-center"
          >
            <option value="">-- Seleccione un Centro --</option>
            <option value="Ciudad Universitaria">UNAH-CU</option>
            <option value="UNAH-VS">UNAH-VS</option>
            <option value="CENTRO UNIVERSITARIO REGIONAL DEL CENTRO">
              UNAH-CURC
            </option>
            <option value="UNAH-CURLA">UNAH-CURLA</option>
            <option value="UNAH-CURLP">UNAH-CURLP</option>
            <option value="UNAH-CUROC">UNAH-CUROC</option>
            <option value="UNAH-CURNO">UNAH-CURNO</option>
            <option value="UNAH-TEC Danli">UNAH-TEC Danli</option>
            <option value="UNAH-TEC Aguan">UNAH-TEC Aguan</option>
          </select>
        </div>
        <div className="my-3">
          <label className="uppercase text-gray-800 block text-sm font-bold">
            Rol del Docente
          </label>
          <select
            value={ROL}
            onChange={(e) => setROL(e.target.value)}
            className="w-full mt-2 p-2 border rounded-xl bg-gray-50 text-center"
          >
            <option value="">-- Seleccione el Rol --</option>
            <option value="2">Docente</option>
            <option value="4">Coordinador de Carrera</option>
            <option value="3">Jefe de Carrera</option>
          </select>
        </div>
        {selectedD ? (
          ""
        ) : (
          <div className="my-3">
            <label className="uppercase text-gray-800 block text-sm font-bold">
              Carrera del Docente
            </label>
            <select
              value={CARRER}
              onChange={(e) => setCARRER(e.target.value)}
              className="overflow-y-scroll w-full mt-2 p-2 border rounded-xl bg-gray-50 text-center"
            >
              <option value="">-- Seleccione Carrera del Docente --</option>
              <option value="Ingenieria en Sistemas">
                Ingenieria en Sistemas
              </option>
              <option value="Ingenieria Quimica Industrial">
                Ingenieria Quimica Industrial
              </option>
              <option value="Ingenieria Electrica Industrial">
                Ingenieria Electrica Industrial
              </option>
              <option value="Ingenieria Industrial">
                Ingenieria Industrial
              </option>
              <option value="INGENIERIA CIVIL">Ingeniería Civil</option>
              <option value="Ingenieria Mecanica Industrial">
                Ingenieria Mecanica Industrial
              </option>
              <option value="Licenciatura en Derecho">
                Licenciatura en Derecho
              </option>
              <option value="Licenciatura en Periodismo">
                Licenciatura en Periodismo
              </option>
              <option value="Licenciatura en Lenguas Extranjeras con Orientación en Inglés y Francés">
                Licenciatura en Lenguas Extranjeras con Orientación en Inglés y
                Francés
              </option>
              <option value="Arquitectura">Arquitectura</option>
              <option value="Licenciatura en Matemáticas">
                Licenciatura en Matemáticas
              </option>
              <option value="Licenciatura en Física">
                Licenciatura en Física
              </option>
              <option value="Licenciatura en Astronomía y Astrofísica">
                Licenciatura en Astronomía y Astrofísica
              </option>
              <option value="Medicina">Medicina</option>
            </select>
          </div>
        )}
        {selectedD ? (
          ""
        ) : (
          <div className="my-3">
            <label
              className="uppercase text-gray-800 block text-sm font-bold my-4"
              htmlFor="numero"
            >
              Imagen Docente
            </label>
            <label htmlFor="file-upload" className="cursor-pointer mx-12">
              <input
                id="file-upload"
                type="file"
                accept=".jpeg, .png "
                className="sr-only"
                onChange={handleImageChange}
              />
              <span
                className={
                  !IMAGE
                    ? "bg-red-500 text-white px-36 py-2 rounded hover:bg-red-600"
                    : "bg-blue-500 text-white px-36 py-2 rounded hover:bg-blue-600"
                }
              >
                <AiOutlineFileImage className="inline-block" />
                {!IMAGE ? "Subir Imagen" : "Cargada"}
              </span>
            </label>
          </div>
        )}
        <input
          type="submit"
          value={!selectedD ? "Registrar Docente" : "Actualizar Docente"}
          className={
            !selectedD
              ? "p-2 bg-sky-600 shadow w-full rounded-lg text-sm uppercase font-bold text-white hover:cursor-pointer hover:bg-sky-900 transition-colors"
              : "p-2 bg-green-600 shadow w-full rounded-lg text-sm uppercase font-bold text-white hover:cursor-pointer hover:bg-green-800 transition-colors"
          }
        />
      </form>
    </>
  );
};

export default FormularioDocente;
