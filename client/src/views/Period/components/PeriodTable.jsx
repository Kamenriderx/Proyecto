import PeriodRow from "./PeriodRow";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import { useEffect, useState } from "react";

const PeriodTable = () => {
  const [state, setState] = useState({
    periods: [],
    selectedYear: "",
    notAwaiting: false,
    charginPeriods: false,
    page: 0,
    data: [],
    sections: [],
    clicked: false,
  });

  const [selectedPeriod, setSelectedPeriod] = useState("");

  const handlePe = (value) => {
    console.log("Valor seleccionado", selectedPeriod);
    httpRequests()
      ["get"](
        `http://localhost:3000/registro/section/getSectionsPeriod/${value}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setState({
          ...state,
          sections: res.data.sections,
        });
      });
  };

  const handlePeriodChange = (event) => {
    const { value, name } = event.target;
    console.log(value, name);
    setSelectedPeriod(value);
    handlePe(value);
  };

  useEffect(() => {
    const handlePetitions = async () => {
      setState({ ...state });
      httpRequests()
        ["get"]("http://localhost:3000/registro/periodAcademic/allperiods", {})

        .then((res) => {
          setState({ ...state, periods: res.data });
          setSelectedPeriod();
          httpRequests(res.data[0].ID_PERIOD)
            ["get"](
              `http://localhost:3000/registro/section/getSectionsPeriod/${selectedPeriod}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res2) => {
              console.log("Valores", res, res2);
              console.log("Valores", selectedPeriod);
              setState({
                ...state,
                sections: res2.data.sections,
              });
            });

          console.log("Periodos", res);
        });
    };
    handlePetitions();
  }, []);

  const handleDownload = async () => {
    const doc = new jsPDF();

    const tableColumn = ["Codigo", "Clase", "Seccion"];
    const tableRows = [];
    console.log("Secciones:", state.sections["0"]);
    state.sections.forEach((section) => {
      console.log(section);
      const sectionData = [
        section.course.CODE_COURSE,
        section.course.NAME,
        section.SECTION_CODE,
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
    const data = state.sections.map(
      (row) =>
        `${row.course.CODE_COURSE},${row.course.NAME},${row.SECTION_CODE}\n`
    );
    const csvContent = `data:text/csv;charset=utf-8,${header[0]},${header[1]},${header[2]}\n
        ${data}
      `;

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
          name="selectedPeriod"
          value={selectedPeriod}
          id="years"
          onChange={handlePeriodChange}
          className="w-25 h-12 rounded-md"
        >
          {state.periods.map((p) => (
            <option key={p.ID_PERIOD} value={p.ID_PERIOD}>
              {p.PERIOD_NAME}
            </option>
          ))}
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
          {state.sections.map((section, index) => (
            <PeriodRow key={index} section={section} />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default PeriodTable;
