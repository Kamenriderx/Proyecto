import { useState } from "react";

const Modal = ({ isOpen, onClose, enviarDatoAlPadre, calificar }) => {
  if (!isOpen) {
    return null;
  }

  const [preguntas, setPreguntas] = useState({});
  console.log(preguntas);

  const handleClick = (e) => {
    // e.preventDefault();
    enviarDatoAlPadre(preguntas);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        {calificar ? (
          <>
            <div className="flex flex-col max-w-4xl justify-between gap-2 overflow-y-auto h-[420px]">
              <form action="">
                <div className="text-xl font-bold ">Planificación</div>
                {/* 1 */}
                <div className="flex gap-4">
                  <div>1</div>
                  <div className="w-4/5">
                    Al iniciar la clase ¿le facilitó por escrito el Programa de
                    la asignatura, que contenia los objetivos de aprendizaje,
                    temas, calendarización de clases y exámenes, formas y
                    criterios de evaluación?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 1: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 2 */}
                <div className="flex gap-4">
                  <div>2</div>
                  <div className="w-4/5">
                    ¿ Demuestra estar actualizado y tener dominio de la
                    disciplina que imparte?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 2: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 3 */}
                <div className="flex gap-4">
                  <div>3</div>
                  <div className="w-4/5">
                    ¿Establece en la clase relación entre los contenidos
                    teóricos y los prácticos?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 3: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 4 */}
                <div className="flex gap-4">
                  <div>4</div>
                  <div className="w-4/5">
                    ¿Utiliza en el desarrollo del curso técnicas educativas que
                    facilitan su aprendizaje (investigaciones en grupo, estudio
                    de casos, visitas al campo, seminarios, mesas redondas,
                    simulaciones, audiciones, ejercicio adicionales, sitios web,
                    etc)?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 4: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 5 */}
                <div className="flex gap-4">
                  <div>5</div>
                  <div className="w-4/5">
                    ¿Utiliza durante la clase medios audiovisuales que facilitan
                    su aprendizaje?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 5: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 6 */}
                <div className="flex gap-4">
                  <div>6</div>
                  <div className="w-4/5">
                    ¿Relaciona el contenido de esta asignatura con otras
                    asignaturas que usted ya curso?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 6: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 7 */}
                <div className="flex gap-4">
                  <div>7</div>
                  <div className="w-4/5">
                    ¿Desarrolló contenidos adecuados en profundidad para el
                    nivel que usted lleva en la carrera?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 7: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 8 */}
                <div className="flex gap-4">
                  <div>8</div>
                  <div className="w-4/5">
                    ¿Selecciona temas y experiencias que le sean a Usted útiles
                    en su vida profesional y cotidiana?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 8: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 9 */}
                <div className="flex gap-4">
                  <div>9</div>
                  <div className="w-4/5">
                    Además de las explicaciones, le recomendó en esta clase
                    otras fuentes de consulta para el desarrollo de esta
                    asignatura, accesibles a Usted, en cuanto a costo,
                    ubicación, etc.
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 9: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>

                <div className="text-xl font-bold ">Actuación</div>
                {/* 10 */}
                <div className="flex gap-4">
                  <div>10</div>
                  <div className="w-4/5">
                    ¿Incentiva la participación de los estudiantes en la clase?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 10: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 11 */}
                <div className="flex gap-4">
                  <div>11</div>
                  <div className="w-4/5">
                    ¿Asiste a las clases con puntualidad y según lo programado?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 11: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 12 */}
                <div className="flex gap-4">
                  <div>12</div>
                  <div className="w-4/5">
                    ¿Inicia y finaliza las clases en el tiempo reglamentario?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 12: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 13 */}
                <div className="flex gap-4">
                  <div>13</div>
                  <div className="w-4/5">
                    ¿Muestra interés en que usted aprenda?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 13: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 14 */}
                <div className="flex gap-4">
                  <div>14</div>
                  <div className="w-4/5">
                    ¿Relaciona el contenido de la clase con la vida real?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 14: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 15 */}
                <div className="flex gap-4">
                  <div>15</div>
                  <div className="w-4/5">
                    ¿Logra mantener la atención de los estudiantes durante el
                    desarrollo de la clase?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 15: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 16 */}
                <div className="flex gap-4">
                  <div>16</div>
                  <div className="w-4/5">
                    ¿Muestra buena disposición para aclarar y ampliar dudas
                    sobre problemas que surgen durante las clases?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 16: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 17 */}
                <div className="flex gap-4">
                  <div>17</div>
                  <div className="w-4/5">
                    ¿Trata respetuosamente, a los estudiantes, durante todos los
                    momentos de la clase?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 17: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 18 */}
                <div className="flex gap-4">
                  <div>18</div>
                  <div className="w-4/5">
                    ¿Mantiene un clima de cordialidad y respeto con todo el
                    grupo de alumnos?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 18: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 19 */}
                <div className="flex gap-4">
                  <div>19</div>
                  <div className="w-4/5">
                    ¿Brinda orientaciones o lineamientos claros sobre cómo hacer
                    y presentar los trabajos asignados durante la clase?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 19: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>

                <div className="text-xl font-bold ">Evaluación</div>
                {/* 20 */}
                <div className="flex gap-4">
                  <div>20</div>
                  <div className="w-4/5">
                    ¿Al inicio del periodo le explicó el sistema de evaluación a
                    utilizarse durante el desarrollo del curso?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 20: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 21 */}
                <div className="flex gap-4">
                  <div>21</div>
                  <div className="w-4/5">
                    ¿Practicó evaluaciones de acuerdo a los objetivos propuestos
                    en las clases, los contenidos desarrollados y en las fechas
                    previstas?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 21: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 22 */}
                <div className="flex gap-4">
                  <div>22</div>
                  <div className="w-4/5">
                    ¿Le entregó los resultados de las pruebas o exámenes y
                    trabajos en el termino de 2 semanas.?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 22: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 23 */}
                <div className="flex gap-4">
                  <div>23</div>
                  <div className="w-4/5">
                    ¿En la revisión de las evaluaciones le permitió conocer sus
                    aciertos y discutir sus equivocaciones?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 23: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 24 */}
                <div className="flex gap-4">
                  <div>24</div>
                  <div className="w-4/5">
                    ¿Da a conocer criterios para calificar y los aplica al
                    revisar los exámenes, prueba, trabajos?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 24: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 25 */}
                <div className="flex gap-4">
                  <div>25</div>
                  <div className="w-4/5">
                    ¿Utiliza los exámenes y la revisión de estos, como medio
                    para afianzar su aprendizaje?
                  </div>
                  <div>
                    <select required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      onChange={(event) =>
                        setPreguntas({ ...preguntas, 25: event.target.value })
                      }
                    >
                      <option value="" selected>
                        SELECCIONAR
                      </option>
                      <option value="Deficiente">Deficiente</option>
                      <option value="Bueno">Bueno</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Excelente">Excelente</option>
                    </select>
                  </div>
                </div>
                {/* 26 */}
                <div className="flex gap-4">
                  <div>26</div>
                  <div className="w-full">
                    ¿Utiliza los exámenes y la revisión de estos, como medio
                    para afianzar su aprendizaje?
                  </div>
                </div>
                <div>
                  <textarea required
                    onChange={(event) =>
                      setPreguntas({ ...preguntas, 26: event.target.value })
                    }
                    className="p-2.5 max-h-16 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Escribe tu respuesta aqui..."
                  ></textarea>
                </div>
                {/* 27 */}
                <div className="flex gap-4">
                  <div>27</div>
                  <div className="w-full">
                    A su criterio, ¿en que aspectos de su desempeño docente, su
                    profesor puede mejorar?
                  </div>
                </div>
                <div>
                  <textarea required
                    onChange={(event) =>
                      setPreguntas({ ...preguntas, 27: event.target.value })
                    }
                    className="p-2.5 max-h-16 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Escribe tu respuesta aqui..."
                  ></textarea>
                </div>
                {/* 28 */}
                <div className="flex gap-4">
                  <div>28</div>
                  <div className="w-full">
                    Ha identificado Usted en su profesor(a) una actitud no
                    acorde con un docente universitario
                  </div>
                </div>
                <div>
                  <textarea required
                    onChange={(event) =>
                      setPreguntas({ ...preguntas, 28: event.target.value })
                    }
                    className="p-2.5 max-h-16 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Escribe tu respuesta aqui..."
                  ></textarea>
                </div>
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="p-3 mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-md shadow-md rounded mr-4"
                >
                  Cerrar
                </button>
                <button type="submit"
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  className="p-3 mt-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
                >
                  Enviar
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <p className="mb-4 text-lg font-bold">
              ¡Debe evaluar a todos los docentes!
            </p>
            <button
              onClick={() => {
                onClose();
              }}
              className="p-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-md shadow-md rounded"
            >
              Cerrar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
