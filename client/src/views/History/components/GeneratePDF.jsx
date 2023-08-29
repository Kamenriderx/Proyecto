import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import UNAH_LOGO from "../../../assets/UNAH-pdf.png";
import seal from "../../../assets/selloUnah_.png";
import bars from "../../../assets/barras.png";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  header: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  imageContainer: {
    position: "absolute",
    top: `40%`,
    left: `50%`,
    width: "90px",
    height: "90px",
    zIndex: "10",
    opacity: "0.5",
  },
  image: {
    zIndex: "10",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  bold: {
    fontWeight: "bold",
  },
});

// const history = {
//   basicInformation: {
//     accountNumber: "20171003445",
//     name: "Aníbal Alejandro",
//     lastName: "Reyes Maradiaga",
//     career: "Ingenieria en sistemas",
//     center: "Ciudad universitaria",
//   },
//   academicInformation: {
//     totalUV: 204,
//     UVenrollmentsProduct: 18288,
//     careers: [
//       {
//         career: "Ingenieria en sistemas",
//         years: [
//           {
//             year: "2017",
//             enrollments: [
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//             ],
//           },
//           {
//             year: "2018",
//             enrollments: [
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//             ],
//           },
//           {
//             year: "2019",
//             enrollments: [

//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//             ],
//           },
//           {
//             year: "2020",
//             enrollments: [
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//               {
//                 code: "110",
//                 name: "Matematicas 1",
//                 uv: "5",
//                 period: "I",
//                 CALIFICATION: "90",
//                 OBS: "APR",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// };

const Header = ({ history }) => {
  return (
    <View style={styles.header}>
      <View
        style={{
          fontSize: "10px",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingLeft: "40px",
          paddingRight: "40px",
          justifyContent: "space-between",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ marginRight: "5px" }}>
            {history.basicInformation.accountNumber}
          </Text>
          <Text>
            {`${history.basicInformation.name} ${history.basicInformation.lastName}`.toUpperCase()}
          </Text>
        </View>
        <View>
          <Text>{`${
            new Date().getMonth() + 1
          }/${new Date().getDate()}/${new Date().getFullYear()}`}</Text>
        </View>
      </View>
    </View>
  );
};
const Footer = () => {
  return (
    <View style={styles.footer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          fontSize: "10px",
        }}
      >
        <Text>2679064/nperez</Text>
        <Text>"La Educación es la Primera Necesidad de la Replública"</Text>
        <Text
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
          fixed
        />
      </View>
    </View>
  );
};
const TableYear = ({ year, }) => {
  return (
    <View style={{ marginTop: "10px", marginBottom: "30px" }}>
      <View
        style={{
          fontSize: "14px",
          width: "100%",
          textAlign: "center",
          backgroundColor: "#eee",
          paddingTop: "2px",
          paddingBottom: "2px",
        }}
      >
        <Text>{year.career.toLocaleUpperCase()}</Text>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <View style={{ width: "42%", border: "1px solid black" }}></View>
        <View style={{ width: "16%" }}>
          <Text
            style={{
              fontSize: "14px",
              textAlign: "center",
              fontFamily: "Helvetica-Bold",
            }}
          >
            {year.year.year}
          </Text>
        </View>
        <View style={{ width: "42%", border: "1px solid black" }}></View>
      </View>
      <View style={{ marginTop: "10px" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "12px",
            width: "100%",
            fontFamily: "Helvetica-Bold",
          }}
        >
          <View style={{ width: "10%" }}>
            <Text>CODIGO</Text>
          </View>
          <View style={{ width: "50%", paddingLeft: "5px" }}>
            <Text>NOMBRE</Text>
          </View>
          <View style={{ textAlign: "center", width: "8%" }}>
            <Text>UV</Text>
          </View>
          <View style={{ textAlign: "center", width: "14%" }}>
            <Text>PERIODO</Text>
          </View>
          <View style={{ textAlign: "center", width: "8%" }}>
            <Text>NOTA</Text>
          </View>
          <View style={{ textAlign: "center", width: "10%" }}>
            <Text>OBS</Text>
          </View>
        </View>
        {year.year.enrollments.map((enrollment) => (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: "10px",
                width: "100%",
                marginBottom: "2px",
                marginTop: "2px",
              }}
            >
              <View style={{ width: "10%" }}>
                <Text>{enrollment.code}</Text>
              </View>
              <View style={{ width: "50%", paddingLeft: "5px" }}>
                <Text>{enrollment.career}</Text>
              </View>
              <View style={{ textAlign: "center", width: "8%" }}>
                <Text>{enrollment.uv}</Text>
              </View>
              <View style={{ textAlign: "center", width: "14%" }}>
                <Text>{enrollment.period}</Text>
              </View>
              <View style={{ textAlign: "center", width: "8%" }}>
                <Text>{enrollment.CALIFICATION}</Text>
              </View>
              <View style={{ textAlign: "center", width: "10%" }}>
                <Text>{enrollment.OBS}</Text>
              </View>
            </View>
          </>
        ))}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          fontSize: "12px",
          marginTop: "5px",
          fontFamily: "Helvetica-Bold",
        }}
      >
        <View style={{ marginRight: "60px", marginLeft: "20px" }}>
          <Text>Total Aprobadas</Text>
        </View>
        <View>
          <Text>{year.year.enrollments.length}</Text>
        </View>
      </View>
    </View>
  );
};
const FirstPage = ({ page,history }) => {
  return (
    <Page size={"A4"} style={{ padding: "40px" }}>
      <Header history = {history}></Header>

      <View
        style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
      >
        <View style={{ width: "60px", height: "60px", marginRight: "30px" }}>
          <Image
            src={UNAH_LOGO}
            style={{ objectFit: "contain", height: "100%", width: "100%" }}
          ></Image>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
            Universidad Nacional Autónoma de Honduras
          </Text>
          <Text style={{ fontSize: "14px" }}>
            Dirección de Ingresos Permanencia y Promoción
          </Text>
          <Text style={{ fontSize: "14px" }}>Historial Académico</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderRadius: "10px",
          backgroundColor: "#eee",
          fontSize: "12px",
          paddingTop: "10px",
          paddingBottom: "10px",
          marginTop: "20px",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "40%",
            paddingLeft: "10px",
          }}
        >
          <View style={{ marginRight: "5px" }}>
            <Text>Cuenta:</Text>
            <Text style={{ marginTop: "5px" }}>Nombre:</Text>
            <Text style={{ marginTop: "5px" }}>Apellido:</Text>
          </View>
          <View>
            <Text>20171003445</Text>
            <Text style={{ marginTop: "5px" }}>
              {history.basicInformation.name}
            </Text>
            <Text style={{ marginTop: "5px" }}>
              {history.basicInformation.lastName}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "60%",
            paddingLeft: "10px",
          }}
        >
          <View style={{ marginRight: "5px" }}>
            <Text>Carrera Actual:</Text>
            <Text style={{ marginTop: "5px" }}>Centro:</Text>
            <Text style={{ marginTop: "5px" }}>Indice:</Text>
          </View>
          <View>
            <Text>{history.basicInformation.career.toLocaleUpperCase()}</Text>
            <Text style={{ marginTop: "5px" }}>
              {history.basicInformation.center.toLocaleUpperCase()}
            </Text>
            <Text style={{ marginTop: "5px" }}>
              {parseInt(
                history.academicInformation.UVenrollmentsProduct /
                  history.academicInformation.totalUV
              )}
              %
            </Text>
          </View>
        </View>
      </View>

      {page.map((year) => (
        <TableYear year={year} />
      ))}

      <Footer></Footer>
      <View style={styles.imageContainer}>
        <Image style={styles.image} src={seal} />
      </View>
    </Page>
  );
};

const ContentPage = ({ page }) => {
  return (
    <Page size={"A4"} style={{ padding: "40px" }}>
      <Header />
      {page.map((year) => (
        <TableYear year={year} />
      ))}
      <Footer />
      <View style={styles.imageContainer}>
        <Image style={styles.image} src={seal} />
      </View>
    </Page>
  );
};
const LastPage = ({history}) => {
  return (
    <Page size={"A4"} style={{ padding: "40px" }}>
      <View
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          width: "90px",
          height: "90px",
          transform: `rotate(${Math.floor(Math.random() * 10)}deg)`,
          zIndex: "10",
          opacity: "0.5",
        }}
      >
        <Image style={styles.image} src={seal} />
      </View>
      <Header history ={history} />

      <View
        style={{ fontSize: "12px", marginTop: "20px", textAlign: "center" }}
      >
        <View>
          <Text>
            ********************************************Ultima
            Linea********************************************
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontFamily: "Helvetica-Bold" }}>
            Cálculo de índice académico:
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ margin: "10px 20px 10px 10px" }}>
              <Text>Suma de UV x Nota:</Text>
              <Text>Suma de UV:</Text>
              <Text>Indice académico:</Text>
            </View>
            <View style={{ margin: "10px 20px 10px 10px" }}>
              <Text>{history.academicInformation.UVenrollmentsProduct}</Text>
              <Text>{history.academicInformation.totalUV}</Text>
              <Text>
                {history.academicInformation.UVenrollmentsProduct}/
                {history.academicInformation.totalUV} ={" "}
                {parseInt(
                  history.academicInformation.UVenrollmentsProduct /
                    history.academicInformation.totalUV
                )}
                %
              </Text>
            </View>
          </View>
        </View>

        <View style={{ width: "200px", height: "40px", marginLeft: "20px" }}>
          <Image
            src={bars}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          ></Image>
        </View>
      </View>

      <Footer />
    </Page>
  );
};

const GeneratePDF = ({ history, basicInformation }) => {
  let [pages, setPages] = useState(null);
  let [firstPage, setFirstPage] = useState(null);
  console.log(history);
  useEffect(() => {
    let contentPages = [];
    let pageSize = 0;
    let firstPageSize = 150;
    let inserted = false;
    let page = [];
    for (const career of history.academicInformation.careers) {
      for (const year of career.years) {
        const tableSize = 98 + year.enrollments.length * 14;
        if (!inserted) {
          console.log("tamaño de la pagina",tableSize);
          if (firstPageSize + tableSize <= 560) {
            page.push({ year, career: career.career });
            firstPageSize += tableSize;
          } else {
            setFirstPage([page]);
            inserted = true;
            page = [];
            pageSize = 0;
            console.log("Primera pagina",firstPageSize);
          }
        }
        if (inserted) {
          if (pageSize + tableSize <= 560) {
            page.push({ year, career: career.career });
            pageSize += tableSize;
          } else {
            contentPages.push(page);
            page = [];
            page.push({ year, career: career.career });
            pageSize = tableSize;
          }
        }
      }
    }
    if (page.length > 0) {
      if (inserted) {
        contentPages.push(page);
      } else {
        setFirstPage([page]);
      }
    }
    setPages(contentPages);
    console.log("Contenido de las paginas",contentPages);

  }, []);

  return (
    <Document>
      {firstPage && firstPage?.map((page) => <FirstPage history={history}  page={page} />)} 
      {pages && pages?.map((page) => <ContentPage history={history} page={page} />)} 
      <LastPage history={history}></LastPage> 
    </Document>
  );
};

export default GeneratePDF;
