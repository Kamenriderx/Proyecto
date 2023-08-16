const { Op } = require("sequelize")
const { getMyCourseEnded, getMyIndexAcademic, getMyCoursePeriodPrev, getMyCourseAproved } = require("../helpers/repositorySections")
const DetailsPeriod = require("../models/detailsPeriod")
const PeriodAcademic = require('../models/periodAcademic');
const verifyIndexAcademic = async(req,res,next)=>{
    try {

      const {student} = req
      const periodAux = await PeriodAcademic.findOne({where:{STATUS: "En curso"}})
      const idPeriod = periodAux.ID_PERIOD
      const courses = await getMyCourseEnded(student.ID_STUDENT)
      const {calendars, previousPeriod} = await getAcademicPeriodDetails(idPeriod)
      const coursesPeriodPrev = await getMyCoursePeriodPrev(student.ID_STUDENT,previousPeriod)
      const coursesAproved = await getMyCourseAproved(student.ID_STUDENT)
      let indexAcademicGlobal = await getMyIndexAcademic(courses) || 0
      let indexAcademicPeriod = await getMyIndexAcademic(coursesPeriodPrev) || 0
      let currentDayMonth = formatDate(new Date());
      let currentYear = new Date().getFullYear()
      let currentMonth = new Date().getMonth()
      // indexAcademicPeriod = 84 
      
      if (calendars[0].date == currentDayMonth && (student.TYPE == 'Primer ingreso' ||student.TYPE == 'Proseene' ||student.TYPE == 'Condicionado' || student.TYPE == 'Representante'|| (student.TYPE =="Re-ingreso" && indexAcademicGlobal >= 80 && coursesAproved.count >=10 )|| (student.TYPE =="Por egresar" && indexAcademicGlobal >= 80))) {
          
        next()
        return
      }
      if (calendars[1].date == currentDayMonth && ((student.TYPE == 'Por egresar' && indexAcademicGlobal < 80) || (student.TYPE =="Re-ingreso" && indexAcademicPeriod >= 91))) {
        
        next()
        return
      }
      if (calendars[2].date === currentDayMonth && (student.TYPE =="Re-ingreso" && indexAcademicPeriod >= 91 && indexAcademicPeriod <= 100 )) {
        
        next()
        return
      }
      if (calendars[3].date == currentDayMonth && (student.TYPE =="Re-ingreso" && indexAcademicPeriod >= 80 && indexAcademicPeriod <=90)) {
        
        next()
        return
      }
      
      if (calendars[4].date == currentDayMonth && (student.TYPE =="Re-ingreso" && indexAcademicPeriod >= 70 && indexAcademicPeriod < 80)) {
        
        next()
        return
      }
      console.log(calendars)
      if (calendars[5].date == currentDayMonth && (student.TYPE =="Re-ingreso" && indexAcademicPeriod <70)) {
        console.log('indexAcademicPeriod: ',indexAcademicPeriod)
        next()
        return
      }
      // console.log('indexAcademicPeriod: ',indexAcademicPeriod)

      res.status(400).json({messagge:"No cumplés con los requisitos para matricular el dia de hoy"})
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

const getAcademicPeriodDetails = async (id) => {
    try {
      // Obtiene el período académico por ID
      const detailsPeriod = await DetailsPeriod.findOne({where:{ID_PERIOD:id}});
      if (!detailsPeriod) {
        return { error: 'No se encontró información para el período académico especificado' };
      }
  
      const { REGISTRATION_START_DATE, REGISTRATION_END_DATE } = detailsPeriod;
  
      // Crea una lista para almacenar la información de cada día del período
      const calendars = [];
      
      // Convierte las fechas en objetos Date
      const startDate = new Date(REGISTRATION_START_DATE);
      const finishDate = new Date(REGISTRATION_END_DATE);
  
      // Itera sobre el rango de fechas y la información se agrega a cada día "calendars"
      let currentDate = new Date(startDate);
      let percentageIndex = 0;

      
      while (currentDate <= finishDate) {
        const dateLabel = formatDate(currentDate); 
  
        // Asigna un texto fijo
        let students = "PRIMER INGRESO";
        switch (percentageIndex) {
          case 0:
            students = "EXCELENCIA ACADEMICA (índice global de 80% a 100% y que además tengan 10 o más asignaturas aprobadas en su historial académico / REPRESENTANTES DE LA UNAH EN ASPECTOS ARTÍSTICOS, CULTURALES Y DEPORTIVOS / CONDICIONADOS /  PROSEENE / POR EGRESAR (índice global de 80% a 100% y su índice de periodo es de 0% a 100%) / PRIMER INGRESO PROVENIENTES DE OTRAS UNIVERSIDADES Y GRADUADOS DE LA UNAH";
            break;
          case 1: 
            students = "POR EGRESAR (índice global de 0% a 79% y su índice de periodo es de 0% a 100%)";
            break;
          case 2:
            students = "91% a 100%";
            break;
          case 3:
            students = "80% a 90%";
            break;
          case 4:
            students = "70% a 79%";
            break;
          case 5:
            students = "0% a 69%";
            break;
          default:
            break;
        }
  
        calendars.push({
          date: dateLabel,
          hour: "9:00 a.m A 10:59 p.m.", 
          students: students,
        });
  
        // Incrementa el índice de porcentaje 
        percentageIndex = (percentageIndex + 1) % 6;
  
        currentDate.setDate(currentDate.getDate() + 1);
      }

      
      // Obtiene información del período académico
      const academicPeriod = await PeriodAcademic.findOne({where:{ID_PERIOD:id}});
      if (!academicPeriod) {
        return{ error: 'No se encontró información para el período académico especificado' };
      }
  
    const previousPeriod = await PeriodAcademic.findOne({
    where: {
        FINISH_DATE: {
        [Op.lt]: academicPeriod.START_DATE,
        },
    },
    order: [['FINISH_DATE', 'DESC']],
    attributes: ['PERIOD_NAME', "ID_PERIOD"],
    });

  
      return {calendars, previousPeriod};
    } catch (error) {
      console.error('Error al obtener detalles del período académico:', error);
      return { error: 'Ocurrió un error al obtener detalles del período académico' };
    }
  };
  
  // Formatea la fecha
  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('es-ES', options);
  };
  
  

module.exports = {
    verifyIndexAcademic,
    getAcademicPeriodDetails
};
/**
 * [
    {
      date: 'miércoles, 9 de agosto',
      hour: '9:00 a.m A 10:59 p.m.',
      students: 'EXCELENCIA ACADEMICA (índice global de 80% a 100% y que además tengan 10 o más asignaturas aprobadas en su historial académico / REPRESENTANTES DE LA UNAH EN ASPECTOS ARTÍSTICOS, CULTURALES Y DEPORTIVOS / CONDICIONADOS /  PROSEENE / POR EGRESAR (índice global de 
80% a 100% y su índice de periodo es de 0% a 100%) / PRIMER INGRESO PROVENIENTES DE OTRAS UNIVERSIDADES Y GRADUADOS DE LA UNAH'
    },
    {
      date: 'jueves, 10 de agosto',
      hour: '9:00 a.m A 10:59 p.m.',
      students: 'POR EGRESAR (índice global de 0% a 79% y su índice de periodo es de 0% a 100%)'
    },
    {
      date: 'viernes, 11 de agosto',
      hour: '9:00 a.m A 10:59 p.m.',
      students: '91% a 100%'
    },
    {
      date: 'sábado, 12 de agosto',
      hour: '9:00 a.m A 10:59 p.m.',
      students: '80% a 90%'
    },
    {
      date: 'domingo, 13 de agosto',
      hour: '9:00 a.m A 10:59 p.m.',
      students: '70% a 79%'
    },
    {
      date: 'lunes, 14 de agosto',
      hour: '9:00 a.m A 10:59 p.m.',
      students: '0% a 69%'
    }
  ]
 * 
 */