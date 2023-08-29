import PeriodRow from "./PeriodRow";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { httpRequests } from "../../../utils/helpers/httpRequests";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import unidecode from "unidecode";

const PeriodTable = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 0,
    items: 10,
  });
  const [viewableSections, setViewableSections] = useState([]);
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

        setPagination({
          ...pagination,
          page: 1,
          pages: Math.ceil(res.data.sections.length / pagination.items),
        });
        let viewSections = [];
        for (let i = 0; i < pagination.items; i++) {
          if (res.data.sections[i]) {
            viewSections.push(res.data.sections[i]);
          }
        }

        setViewableSections(viewSections);
      });
  };
  useEffect(() => {
    let viewSections = [];
    for (
      let i = pagination.page * pagination.items - pagination.items;
      i < pagination.page * pagination.items + 1;
      i++
    ) {
      if (state.sections[i]) {
        viewSections.push(state.sections[i]);
      }
    }

    setViewableSections(viewSections);
  }, [pagination.page]);

  const handlePeriodChange = (event) => {
    const { value, name } = event.target;
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
              setState({
                ...state,
                sections: res2.data.sections,
              });
              setPagination({
                ...pagination,
                page: 1,
                pages: Math.ceil(res2.data.sections.length / 10),
              });
            });
        });
    };
    handlePetitions();
  }, []);

  const handleDownload = async () => {
    const doc = new jsPDF();

    const tableColumn = ["Código", "Clase", "Sección"];
    const tableRows = [];
    state.sections.forEach((section) => {
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
    const header = ["Código", "Clase", "Sección"];
    const data = state.sections.map(
      (row) =>
        `\n${unidecode(row.course.CODE_COURSE)},${unidecode(
          row.course.NAME
        )},${unidecode(row.SECTION_CODE)}`
    );
    const csvContent =
      "data:text/csv;charset=utf-8," +
      `${unidecode(header[0])},${unidecode(header[1])},${unidecode(
        header[2]
      )}` +
      `${data}`;

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
      <div>
        <div className="flex min-w-full justify-end mb-4 items-center align-middle">
          <select
            name="selectedPeriod"
            value={selectedPeriod}
            id="years"
            onChange={handlePeriodChange}
            className="w-25 h-12 rounded-md"
          >
            <option className="flex justify-center text-center">
              <div>-</div>
            </option>
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
              <li className="flex justify-center items-center w-1/3 ">
                Código
              </li>
              <li className="flex justify-center items-center w-1/3 ">Clase</li>
              <li className="flex justify-center items-center w-1/3 ">
                Sección
              </li>
            </ul>
          </li>
          <div className="border border-gray-200 rounded-lg p-0">
            {viewableSections.map((section, index) => (
              <PeriodRow key={index} section={section} />
            ))}
          </div>
        </ul>
      </div>
      <div className="flex justify-center">
        <Pagination setPagination={setPagination} pagination={pagination} />
      </div>
    </div>
  );
};

export default PeriodTable;
