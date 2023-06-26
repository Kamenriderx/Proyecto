import { useState } from "react";
import Alert from "../../components/Alert";
import { DotSpinner } from "@uiball/loaders";
import TableStudents from "../../views/TableStudents/TableStudents.jsx";

const ReadCSV = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [mostrarTable, setMostrarTable] = useState(false);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file.name.includes("csv")) {
      setError(true);
      setMostrarTable(false);
      console.log("Error de archivo");
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

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    result.pop();
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
          <Alert
            title="El Archivo no es un CSV, intentar de nuevo"
            icon="error"
          />
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
