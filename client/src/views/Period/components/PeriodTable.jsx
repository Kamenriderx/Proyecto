import PeriodRow from "./PeriodRow";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import { useEffect, useState } from "react";



const PeriodTable = () => {
  const [state, setState] = useState({
    periods: [],
    selectedYear: "",
    notAwaiting:false,
    page:0,
    data:[],
    sections:[
      {code:"is-309",className: "Ingenieria del software",section: "1700"},
      {code:"is-309",className: "Ingenieria del software",section: "1800"},
      {code:"is-309",className: "Ingenieria del software",section: "1900"},
    ]
  });
  const handlePeriodChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });



  };

  useEffect(() => {
    const handlePetitions = async () => {
      setState({...state,notAwaiting:false});
      const periods = await httpRequests()["get"](
        "http://localhost:3000/registro/planification/getPeriods",
        {}
        );
      setState({ ...state,periods: periods.data,notAwaiting:true});
    };
    handlePetitions();
  }, []);

  const handleDownload = async () => {
    const doc = new jsPDF();

    const tableColumn = ["Codigo", "Clase", "Seccion"];
    const tableRows = [];
    state.sections.forEach((section) => {
      const sectionData = [
        section.code,
        section.className,
        section.section
      ];
      tableRows.push(sectionData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Planificacion academica.", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
  };

  const generateCSV = () => {
    const header = ["Codigo", "Clase", "Seccion"];
    const data = state.sections.map((row) => `${row.code},${row.className},${row.section}\n`);
    const csvContent =`data:text/csv;charset=utf-8,${header[0]},${header[1]},${header[2]}\n
        ${data}
      `
              

    const downloadLink = document.createElement("a");
    downloadLink.href = encodeURI(csvContent);
    downloadLink.target = "_blank";
    downloadLink.download = "datos.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <div className="flex min-w-full justify-end mb-4 items-center align-middle">
        <select
          name="selectedYear"
          value={state.selectedYear}
          id="years"
          onChange={handlePeriodChange}
          className="w-25 h-9 rounded-md w"
        >

          {state.notAwaiting && state.periods.map(p=><option key={p.ID_PERIOD} value={p.ID_PERIOD}>{p.PERIOD_NAME}</option>) || ""}
          
        </select>
      </div>
      <div className="m-3 flex justify-around">
        <button
          onClick={generateCSV}
          className="bg-lime-500 text-white w-40 rounded-md h-8 m-3 hover:bg-lime-600"
        >
          Descargar CSV
        </button>
        <button
          onClick={handleDownload}
          className="bg-red-500 text-white w-40 rounded-md h-8 m-3 hover:bg-red-600"
        >
          Descargar PDF
        </button>
      </div>
      <ul>
        <li className="border border-gray-200 cursor-default rounded-xl p-2 mb-3 bg-gray-400 text-white">
          <ul className="list-none flex flex-row min-w-full">
            <li className="flex justify-center items-center w-1/3 ">Codigo</li>
            <li className="flex justify-center items-center w-1/3 ">Clase</li>
            <li className="flex justify-center items-center w-1/3 ">Seccion</li>
          </ul>
        </li>
        <div className="border border-gray-200 rounded-lg p-0">
          <PeriodRow state={"Finalizado"} periodName={"I Periodo 2023"} />
          <PeriodRow state={"En curso"} periodName={"II Periodo 2023"} />
          <PeriodRow state={"-"} periodName={"III Periodo 2023"} />
        </div>
      </ul>
    </div>
  );
};

export default PeriodTable;
