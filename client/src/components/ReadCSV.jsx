import { useEffect, useState } from "react";
import axios from "axios";
// import Alert from "./Alert";
import { DotSpinner } from "@uiball/loaders";
import TableStudents from "../views/TableStudents/TableStudents.jsx";
import AlertThree from "./AlertThree.jsx";

import Upload from "../assets/Upload.png";

const ReadCSV = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [mostrarTable, setMostrarTable] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [students, setStudents] = useState();
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const callAxios = async () => {
      const { data } = await axios(
        "http://localhost:3000/registro/admin/getStudents"
      );
      setStudents(data);
      // console.log(data );
    };
    callAxios();
  }, [check]);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file?.name.includes("csv")) {
      setError(true);
      setMostrarTable(false);
      // console.log("Error de archivo");
      if (!file) {
        setAlerta({
          text: "Debe seleccionar un archivo.",
          icon: "error",
          title: "Error",
        });
      } else {
        setAlerta({
          text: "El Archivo no es un CSV, favor intentar con otro archivo.",
          icon: "error",
          title: "Error",
        });
      }

      return;
    }

    reader.onload = function (e) {
      const csv = e.target.result;
      csvToJson(csv, event);
    };

    reader.readAsText(file);
  }

  function csvToJson(csv, event) {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");

    function validarArrayExpresionRegular(arr) {
      const expresionRegular = /^NAME,DNI,CARRER,EMAIL,CENTER,\r$/;

      const cadena = arr.join(",");
      return expresionRegular.test(cadena);
    }

    const arr1 = headers;
    // console.log(validarArrayExpresionRegular(arr1));

    if (!validarArrayExpresionRegular(arr1)) {
      event.target.value = null;

      setError(true);
      setMostrarTable(false);
      // console.log("El archivo no tiene completo el encabezado.");
      setAlerta({
        text: "Error en el encabezado del archivo.",
        title: "Error",
        icon: "error",
      });
      return;
    }

    const result = [];

    for (let i = 1; i < lines.length - 1; i++) {
      const obj = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < headers.length - 1; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    // console.log("result: ", result);
    setData(result);
    setError(false);
    setMostrarTable(true);
  }

  return (
    <>
      {mostrarTable && (
        <div className="flex mt-32 mb-8 mx-20">
          <div className="flex">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />

              <img
                src={Upload}
                className="w-20 h-20 rounded-full object-cover"
              />
            </label>
          </div>
        </div>
      )}

      {error ? (
        <>
          <AlertThree alerta={alerta} />
          <div className="flex justify-center my-64">
            <div className="flex space-x-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                <img
                  src={Upload}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </label>
            </div>
          </div>
        </>
      ) : mostrarTable ? (
        <TableStudents body={data} />
      ) : (
        <div className="flex justify-center my-64">
          <div className="flex space-x-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />

              <img
                src={Upload}
                className="w-32 h-32 rounded-full object-cover"
              />
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadCSV;
