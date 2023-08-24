import { useEffect, useState } from "react";
import TableRow from "./components/TableRow";
import { httpRequests } from "../../utils/helpers/httpRequests";
import jsPDF from "jspdf";


const History = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [basicInformation, setBasicInformation] = useState({});
  const [proms, setProms] = useState({
    global:0,
    period:0
  });

  useEffect(() => {
    httpRequests()
      ["get"]("http://localhost:3000/registro/history/getHistory", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res);
        let globalProm;
        let periodProm;
        let totalUV=0;
        let totalSum=0;
        
        let totalLastPeriodUV=0;
        let totalLastPeriodSum=0;
        res.data.data.forEach(enrollment=>{
            if(enrollment.calification!==0){

            
            totalUV += enrollment.uv ;
            totalSum += enrollment.uv*enrollment.calification
            
            if(enrollment.ID_PERIOD === res.data.lastPeriod ){
                totalLastPeriodUV += enrollment.uv;
                totalLastPeriodSum += enrollment.uv*enrollment.calification
            }
        }
        });
        console.log("Suma total:",res);
        globalProm = totalSum  /totalUV;
        periodProm = totalLastPeriodSum /totalLastPeriodUV;
        setProms({global:globalProm,period:periodProm});
        setEnrollments(res.data.data);
        setBasicInformation(res.data.basicInformation);
      });
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF();
    const enrollmentss = [
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2020",
        period_name: "I periodo",
        calification: "80",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2020",
        period_name: "I periodo",
        calification: "80",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2021",
        period_name: "I periodo",
        calification: "81",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2021",
        period_name: "I periodo",
        calification: "81",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2021",
        period_name: "I periodo",
        calification: "81",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2021",
        period_name: "I periodo",
        calification: "81",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2022",
        period_name: "I periodo",
        calification: "82",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2023",
        period_name: "I periodo",
        calification: "83",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2023",
        period_name: "I periodo",
        calification: "83",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2023",
        period_name: "I periodo",
        calification: "83",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2023",
        period_name: "I periodo",
        calification: "83",
        obs: "APR",
      },
      {
        code_course: "MM110",
        name: "Matematicas 110",
        uv: "5",
        section_code: "1900",
        year: "2023",
        period_name: "I periodo",
        calification: "83",
        obs: "APR",
      },
    ];

    // Título más grande
    doc.setFontSize(16);
    doc.text(
      "Universidad Nacional Autónoma de Honduras",
      doc.internal.pageSize.getWidth() / 2,
      30,
      {
        align: "center",
      }
    );

    // Título más pequeño
    doc.setFontSize(12);
    doc.text(
      "Direccion de Ingresos Permanencia y Promoción",
      doc.internal.pageSize.getWidth() / 2,
      35,
      {
        align: "center",
      }
    );
    doc.setFontSize(12);
    doc.text("Historial Academico", doc.internal.pageSize.getWidth() / 2, 40, {
      align: "center",
    });

    // Tamaño y posición del rectángulo
    const rectWidth = 190;
    const rectHeight = 30;
    const centerX = doc.internal.pageSize.getWidth() / 2 - rectWidth / 2;
    const centerY = 50;

    // Dibuja el rectángulo
    doc.roundedRect(centerX, centerY, rectWidth, rectHeight, 5, 5);

    // Contenido para las celdas
    const content = [
      [
        `Cuenta: ${basicInformation.ACCOUNT_NUMBER}`,
        `Carrera Actual: ${basicInformation.CAREER}`,
      ],
      [`Nombre:${basicInformation.NAME}`, `Centro: ${basicInformation.CENTER}`],
      [`Indice: ${isNaN(proms.global) ? "0" : proms.global}`, ``],
    ];

    // Estilos para el texto
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Espaciado entre las celdas
    const cellSpacingX = rectWidth / 2;
    const cellSpacingY = rectHeight / 3;

    // Posición inicial de la primera celda
    let xPosition = centerX;
    let yPosition = centerY + 6;

    // Agrega el contenido a las celdas
    for (const row of content) {
      for (const cell of row) {
        doc.text(cell, xPosition + 5, yPosition);
        xPosition += cellSpacingX;
      }
      xPosition = centerX;
      yPosition += cellSpacingY;
    }

    const rect2Width = 190;
    const rect2Height = 8;
    const centerX2 = doc.internal.pageSize.getWidth() / 2 - rect2Width / 2;
    const centerY2 = 85; // Distancia desde el borde superior del primer rectángulo

    // Establece el color de relleno del segundo rectángulo
    doc.setFillColor(255, 255, 255); // Color blanco para el fondo del segundo rectángulo

    // Dibuja el segundo rectángulo
    doc.rect(centerX2, centerY2, rect2Width, rect2Height, "FD");

    // Título para el segundo rectángulo
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
      basicInformation.CAREER,
      doc.internal.pageSize.getWidth() / 2,
      centerY2 + 5,
      { align: "center" }
    );
    const titleLineX1 = centerX2 - 20;
    let titleLineY = centerY2 + rect2Height + 10;

    doc.setDrawColor(0, 0, 0); // Color de las líneas
    doc.line(titleLineX1 + 10, titleLineY, 90, titleLineY);
    doc.line(220, titleLineY, 120, titleLineY);

    // Título con líneas centrado horizontalmente entre las líneas

    let currentYear = enrollments[0]?enrollments[0].year : (new Date()).getFullYear();

    const titleWithLines = `${currentYear}`;
    const titleWidth =
      (doc.getStringUnitWidth(titleWithLines) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const titleX = doc.internal.pageSize.getWidth() / 2 - titleWidth / 2;

    doc.setFontSize(16);
    doc.text(titleWithLines, titleX, titleLineY + 3);

    let newCenterY2 = 110;
    let acum = 0;
    let tableData = [];
    let tableX = 20;
    for (const enrollment of enrollments) {
      if (currentYear != enrollment.year) {
        currentYear = enrollment.year;
        newCenterY2 += acum;
        console.log(tableData);
        doc.autoTable({
          head: [["CODIGO", "NOMBRE", "UV", "PERIODO", "NOTA", "OBS"]],
          body: tableData,
          startY: newCenterY2,

          bodyStyles: {
            textColor: [0, 0, 0],
            halign: "center",
            valign: "middle",
          },
          margin: { left: tableX },
          tableWidth: "auto",
          theme: "plain",
        });
        tableData = [];
        acum=0
      }

      // Datos para la tabla
      if(enrollment.calification>0){
        let row = [
          enrollment.section_code,
          enrollment.name,
          enrollment.uv,
          enrollment.period_name.split(" ")[0],
          enrollment.calification,
          enrollment.obs,
        ];
        tableData.push(row);
        acum += 5;
      }
      
    }
    console.log(tableData);
    doc.autoTable({
        head: [["CODIGO", "NOMBRE", "UV", "PERIODO", "NOTA", "OBS"]],
        body: tableData,
        startY: newCenterY2,

        bodyStyles: {
          textColor: [0, 0, 0],
          halign: "center",
          valign: "middle",
        },
        margin: { left: tableX },
        tableWidth: "auto",
        theme: "plain",
      });
    
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.save(`report_${dateStr}.pdf`);
  };

  return (
    <div className="m-24 mt-20">
      <div className=" border m-2 p-4 mb-10">
        <div className="text-center border rounded-t bg-blue-100 mb-3">
          informacion general
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
                <li>INDICEDE PERIODO:</li>
              </ul>
            </div>
            <div className="w-1/2">
              <ul>
                <li>{basicInformation.CENTER}</li>
                <li>{isNaN(proms.global) ? "0" : proms.global}</li>
                <li>{isNaN(proms.period)?"0":proms.period}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="text-center border p-1   bg-blue-100">
          Historial academico
        </div>
        <div className="flex justify-center">
          <button
            className="bg-red-500 text-white w-40 rounded-md h-8 m-3 hover:bg-red-600"
            onClick={handleDownload}
          >
            Descargar PDF
          </button>
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
          {enrollments.map((note) => {
                if(note.calification>0){
                    return (
                        <TableRow {...note} />
                    );
                }
                
            }
              
            )}

          <nav className="flex justify-center mt-6">
            <ul className="flex h-10 border justify-center items-center">
              <li className="hover:bg-slate-400 h-full justify-center items-center flex px-6">
                <a className="" href="#">
                  Anterior
                </a>
              </li>
              <li className="hover:bg-slate-400 h-full w-10 justify-center items-center flex ">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="hover:bg-slate-400 h-full w-10 justify-center items-center flex  ">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="hover:bg-slate-400 h-full w-10 justify-center items-center flex ">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="hover:bg-slate-400 h-full justify-center items-center flex px-6">
                <a className="page-link" href="#">
                  Siguiente
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default History;
