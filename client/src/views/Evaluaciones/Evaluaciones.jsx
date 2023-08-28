import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/ContextExample";
import { httpRequests } from "../../utils/helpers/httpRequests";
import { BiArrowBack } from "react-icons/Bi";
import { useNavigate } from "react-router-dom";

const Evaluaciones = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  //contexto de usuario
  const { state, periodo } = useContext(StoreContext);

  const [dataEvaluacion, setdataEvaluacion] = useState(null);

  const getEvaluacion = async (stateUser) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateUser.token}`,
        },
      };

      const res = await httpRequests()["get"](
        `http://localhost:3000/registro/evaluateProffesor/department/${periodo.ID_PERIOD}/${stateUser.user.ID_USER}`,
        { ...config }
      );

      console.log("GET_EVALUACION: ", res.data);
      setdataEvaluacion(res.data);

      if (!res.status && res?.response?.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvaluacion(state);
  }, [state.user.ID_USER]);

  return (
    <div className="mx-16 mt-28 ">
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
      <p className="text-xl font-bold text-center mb-4">PREGUNTAS</p>
      <div className="grid grid-cols-2 mb-6">
        <div className="overflow-y-auto h-[300px]">
          <div className="font-semibold mb-2 text-lg">
            1- Al iniciar la clase ¿le facilitó por escrito el Programa de la
            asignatura, que contenia los objetivos de aprendizaje, temas,
            calendarización de clases y exámenes, formas y criterios de
            evaluación?
          </div>
          <div className="font-semibold mb-2 text-lg">
            2- ¿ Demuestra estar actualizado y tener dominio de la disciplina
            que imparte?
          </div>
          <div className="font-semibold mb-2 text-lg">
            3- ¿Establece en la clase relación entre los contenidos teóricos y
            los prácticos?
          </div>
          <div className="font-semibold mb-2 text-lg">
            4- ¿Utiliza en el desarrollo del curso técnicas educativas que
            facilitan su aprendizaje (investigaciones en grupo, estudio de
            casos, visitas al campo, seminarios, mesas redondas, simulaciones,
            audiciones, ejercicio adicionales, sitios web, etc)?
          </div>
          <div className="font-semibold mb-2 text-lg">
            5- ¿Utiliza durante la clase medios audiovisuales que facilitan su
            aprendizaje?
          </div>
          <div className="font-semibold mb-2 text-lg">
            6- ¿Relaciona el contenido de esta asignatura con otras asignaturas
            que usted ya curso?
          </div>
          <div className="font-semibold mb-2 text-lg">
            7- ¿Desarrolló contenidos adecuados en profundidad para el nivel que
            usted lleva en la carrera?
          </div>
          <div className="font-semibold mb-2 text-lg">
            8- ¿Selecciona temas y experiencias que le sean a Usted útiles en su
            vida profesional y cotidiana?
          </div>
          <div className="font-semibold mb-2 text-lg">
            9- Además de las explicaciones, le recomendó en esta clase otras
            fuentes de consulta para el desarrollo de esta asignatura,
            accesibles a Usted, en cuanto a costo, ubicación, etc.
          </div>
          <div className="font-semibold mb-2 text-lg">
            10- ¿Incentiva la participación de los estudiantes en la clase?
          </div>
          <div className="font-semibold mb-2 text-lg">
            11- ¿Asiste a las clases con puntualidad y según lo programado?
          </div>
          <div className="font-semibold mb-2 text-lg">
            12- ¿Inicia y finaliza las clases en el tiempo reglamentario?
          </div>
          <div className="font-semibold mb-2 text-lg">
            13- ¿Muestra interés en que usted aprenda?
          </div>
          <div className="font-semibold mb-2 text-lg">
            14- ¿Relaciona el contenido de la clase con la vida real?
          </div>
        </div>
        <div className="overflow-y-auto h-[300px]">
          <div className="font-semibold mb-2 text-lg">
            15- ¿Logra mantener la atención de los estudiantes durante el
            desarrollo de la clase?
          </div>
          <div className="font-semibold mb-2 text-lg">
            16- ¿Muestra buena disposición para aclarar y ampliar dudas sobre
            problemas que surgen durante las clases?
          </div>
          <div className="font-semibold mb-2 text-lg">
            17- ¿Trata respetuosamente, a los estudiantes, durante todos los
            momentos de la clase?
          </div>
          <div className="font-semibold mb-2 text-lg">
            18- ¿Mantiene un clima de cordialidad y respeto con todo el grupo de
            alumnos?
          </div>
          <div className="font-semibold mb-2 text-lg">
            19- ¿Brinda orientaciones o lineamientos claros sobre cómo hacer y
            presentar los trabajos asignados durante la clase?
          </div>
          <div className="font-semibold mb-2 text-lg">
            20- ¿Al inicio del periodo le explicó el sistema de evaluación a
            utilizarse durante el desarrollo del curso?
          </div>
          <div className="font-semibold mb-2 text-lg">
            21- ¿Practicó evaluaciones de acuerdo a los objetivos propuestos en
            las clases, los contenidos desarrollados y en las fechas previstas?
          </div>
          <div className="font-semibold mb-2 text-lg">
            22- ¿Le entregó los resultados de las pruebas o exámenes y trabajos
            en el termino de 2 semanas.?
          </div>
          <div className="font-semibold mb-2 text-lg">
            23- ¿En la revisión de las evaluaciones le permitió conocer sus
            aciertos y discutir sus equivocaciones?
          </div>
          <div className="font-semibold mb-2 text-lg">
            24- ¿Da a conocer criterios para calificar y los aplica al revisar
            los exámenes, prueba, trabajos?
          </div>
          <div className="font-semibold mb-2 text-lg">
            25- ¿Utiliza los exámenes y la revisión de estos, como medio para
            afianzar su aprendizaje?
          </div>
          <div className="font-semibold mb-2 text-lg">
            26- ¿Utiliza los exámenes y la revisión de estos, como medio para
            afianzar su aprendizaje?
          </div>
          <div className="font-semibold mb-2 text-lg">
            27- A su criterio, ¿en que aspectos de su desempeño docente, su
            profesor puede mejorar?
          </div>
          <div className="font-semibold mb-2 text-lg">
            28- Ha identificado Usted en su profesor(a) una actitud no acorde
            con un docente universitario
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto rounded-xl">
        <table className="w-full text-lg text-left text-gray-700 ">
          <thead className="text-xl text-black uppercase bg-gray-200 ">
            <tr>
              <th scope="col" class="px-2">
                Profesor
              </th>
              <th scope="col" class="px-2 py-3">
                Asignatura
              </th>
              <th scope="col" class="px-2 py-3">
                Seccion
              </th>
              <th scope="col" class="px-2 py-3">
                Estudiante
              </th>
              <th scope="col" class="px-2 py-3">
                1
              </th>
              <th scope="col" class="px-2 py-3">
                2
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                3
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                4
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                5
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                6
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                7
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                8
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                9
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                10
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                11
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                12
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                13
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                14
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                15
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                16
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                17
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                18
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                19
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                20
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                21
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                22
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                23
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                24
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                25
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                26
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                27
              </th>{" "}
              <th scope="col" class="px-2 py-3">
                28
              </th>{" "}
            </tr>
          </thead>
          <tbody>
            {dataEvaluacion && (
              <>
                {dataEvaluacion.map((evaluacion) => (
                  <tr
                    key={evaluacion.ID_EVALUATION}
                    className="bg-white border-b hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">{evaluacion.PROFESSOR_CAREER}</td>
                    <td className="px-6 py-4">{evaluacion.COURSE_NAME}</td>
                    <td className="px-6 py-4">{evaluacion.SECTION_CODE}</td>
                    <td className="px-6 py-4">{evaluacion.STUDENT_NAME}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_1}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_2}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_3}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_4}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_5}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_6}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_7}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_8}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_9}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_10}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_11}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_12}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_13}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_14}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_15}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_16}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_17}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_18}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_19}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_20}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_21}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_22}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_23}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_24}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_25}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_26}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_27}</td>
                    <td className="px-6 py-4">{evaluacion.RESP_28}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Evaluaciones;
