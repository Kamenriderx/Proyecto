import { useEffect, useState } from "react";
import TableRow from "./components/TableRow";
import { httpRequests } from "../../utils/helpers/httpRequests";
import jsPDF from "jspdf";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";
import GeneratePDF from "./components/GeneratePDF";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Pagination from "./components/Pagination";

const History = () => {
  const [history,setHistory] = useState(undefined);
  const [viewableSections,setViewableSections] = useState([]);
  const [pagination,setPagination] = useState({
    page:1,
    pages:0,
    items:8
  });
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [enrollments, setEnrollments] = useState([]);
  const [basicInformation, setBasicInformation] = useState({});
  const [proms, setProms] = useState({
    global: 0,
    period: 0,
  });

  useEffect(() => {
    httpRequests()
      ["get"]("http://localhost:3000/registro/history/getHistory", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        let globalProm;
        let periodProm;
        let totalUV = 0;
        let totalSum = 0;

        let totalLastPeriodUV = 0;
        let totalLastPeriodSum = 0;
        res.data.response.data.forEach((enrollment) => {
          if (enrollment.calification !== 0) {
            totalUV += enrollment.uv;
            totalSum += enrollment.uv * enrollment.calification;

            if (enrollment.ID_PERIOD === res.data.response.lastPeriod) {
              totalLastPeriodUV += enrollment.uv;
              totalLastPeriodSum += enrollment.uv * enrollment.calification;
            }
          }
        });
        globalProm = totalSum / totalUV;
        periodProm = totalLastPeriodSum / totalLastPeriodUV;
        setProms({ global: globalProm, period: periodProm });
        setEnrollments(res.data.response.data);
        setBasicInformation(res.data.response.basicInformation);

        setPagination({...pagination,page:1,pages:Math.ceil(res.data.response.data.length/pagination.items)});
        let viewSections = [];
        for(let i = 0; i<  pagination.items;i++){
          if( res.data.response.data[i] ){
            viewSections.push( res.data.response.data[i]);
          }
        }

        setViewableSections(viewSections);
        setHistory(res.data.history);
        console.log("Historial",res.data.history)
      });
  }, []);

  useEffect(() => {
    let viewSections = [];
    for (
      let i = pagination.page * pagination.pages;
      i < pagination.page * pagination.pages + pagination.items;
      i++
    ) {
      if (enrollments[i]) {
        viewSections.push(enrollments[i]);
      }
    }

    setViewableSections(viewSections);
  }, [pagination.page]);

  return (
    <div className="m-24 mt-20">
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
      <div className=" border m-2 p-4 mb-10">
        <div className="text-center border rounded-t bg-blue-100 mb-3 text-2xl font-bold">
          Información General
        </div>
        <div className="flex justify-evenly">
          <div className="flex w-1/2">
            <div className="flex w-1/2">
              <ul className="font-bold">
                <li>CUENTA: </li>
                <li>NOMBRE: </li>
                <li>CARRERA: </li>
              </ul>
            </div>
            <div className="flex w-1/2">
              <ul>
                <li>{basicInformation.ACCOUNT_NUMBER}</li>
                <li>{basicInformation.NAME}</li>
                <li>{basicInformation.CAREER}</li>
              </ul>
            </div>
          </div>
          <div className="flex w-1/2">
            <div className="w-1/2">
              <ul className="font-bold">
                <li>CENTRO:</li>
                <li>INDICE GLOBAL:</li>
                <li>INDICE DE PERIODO:</li>
              </ul>
            </div>
            <div className="w-1/2">
              <ul>
                <li>{basicInformation.CENTER}</li>
                <li>{isNaN(proms.global) ? "0" : parseInt(proms.global)}</li>
                <li>{isNaN(proms.period) ? "0" : parseInt(proms.period)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    <div className="">
      <div className="text-center border p-1   bg-blue-100 text-3xl font-bold">
        Historial Académico
      </div>
      <div className="flex justify-center">
        {history && <PDFDownloadLink document={<GeneratePDF history={history} />} fileName="Historial.pdf">
          <button
            className="bg-red-500 text-white w-40 rounded-md h-8 m-3 hover:bg-red-600"
          >
            Descargar PDF
          </button>
        </PDFDownloadLink>}
      </div>
      <div>
        <ul className="flex justify-around font-bold bg-blue-100 ">
          <li className="border border-blue-100 w-1/12 text-center">
            CODIGO
          </li>
          <li className="border border-blue-100 w-4/12 text-center">
            ASIGNATURA
          </li>
          <li className="border border-blue-100 w-1/12 text-center">UV</li>
          <li className="border border-blue-100 w-1/12 text-center">
            SECCION
          </li>
          <li className="border border-blue-100 w-1/12 text-center">AÑO</li>
          <li className="border border-blue-100 w-1/12 text-center">
            PERIODO
          </li>
          <li className="border border-blue-100 w-2/12 text-center">
            CALIFICAION
          </li>
          <li className="border border-blue-100 w-1/12 text-center">OBS</li>
        </ul>
        {viewableSections.map((note) => {
          if (note.calification > 0) {
            return <TableRow {...note} />;
          }
        })}

      </div>
      <div className="flex justify-center">

        <Pagination setPagination = {setPagination} pagination={pagination}/>
      </div>
    </div>
    </div>
  );
};

export default History;
