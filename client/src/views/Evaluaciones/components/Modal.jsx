const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <div className="overflow-y-auto h-[500px] w-[600px]">
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
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-md font-bold mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
