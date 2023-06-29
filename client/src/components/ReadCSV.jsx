import { useState } from "react";
import { DotSpinner } from "@uiball/loaders";
import TableStudents from "../views/TableStudents/TableStudents.jsx";
import AlertTwo from "./AlertTwo.jsx";

const ReadCSV = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [mostrarTable, setMostrarTable] = useState(false);
  const [alerta, setAlerta] = useState({});


  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file.name.includes("csv")) {
      setError(true);
      setMostrarTable(false);
      console.log("Error de archivo");

      setAlerta({
        text: 'El Archivo no es un CSV, favor intentar con otro archivo.',
        icon: 'error',
        title: 'Error'
      });
      return;
    }

    reader.onload = function (e) {
      const csv = e.target.result;
      csvToJson(csv);
    };

    reader.readAsText(file);
  }

  function csvToJson(csv) {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < (lines.length - 1); i++) {
      const obj = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < (headers.length - 1); j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    console.log("result: ", result);
    setData(result);
    setError(false);
    setMostrarTable(true);
  }

  return (
    <>
      <input
        type="file"
        accept=".csv"
        className="
        file:text-sm file:font-medium 
        hover:file:cursor-pointer
        mx-20 my-10 bg-gray-100 rounded-full"
        onChange={handleFileUpload}
      />

      {error ? (
        <>
          <AlertTwo alerta = {alerta}/>
          <div className="flex justify-center my-10">
            <DotSpinner size={50} speed={0.9} color="white" />
          </div>
        </>
      ) : mostrarTable ? (
        <TableStudents body={data} />
      ) : (
        <div className="flex justify-center my-10">
          <DotSpinner size={50} speed={0.9} color="white" />
        </div>
      )}
    </>
  );
};

export default ReadCSV;
