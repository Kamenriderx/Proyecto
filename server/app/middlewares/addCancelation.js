
const { getMyCourseEnded, getMyIndexAcademic, getMyCoursePeriodPrev, getMyCourseAproved } = require("../helpers/repositorySections")
const { getPeriodicAcademicCurrent, getNextPeriodicAcademic, getDetailsDatesPeriodAcademic } = require("../helpers/repositoryPeriodicAcademic");


const verifyAddCancelation = async(req,res,next)=>{
    try {

      const hourIni = "09:00:00"
      const hourFin = "23:59:59"
      const currentHour = new Date().toTimeString().slice(0, 8);
      let currentYear = new Date().getFullYear()
      let currentMonth = new Date().getMonth()
      let currentPeriod = await getPeriodicAcademicCurrent()
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60 * 1000; // Offset en milisegundos
      const localDate = new Date(now.getTime() - offset);
      const currentDate = localDate.toISOString().slice(0, 10);
      //  no existe un periodo en curso
      if (!currentPeriod) {
        currentPeriod = await getNextPeriodicAcademic(currentYear,currentMonth)
        
      }
      if (!currentPeriod) {
        res.status(400).json({messagge:"El siguiente período todavía no ha sido planificado."})
        return   
        
      }

      const idPeriod = currentPeriod.ID_PERIOD

      const calendarPreRegistration = await getDetailsDatesPeriodAcademic(idPeriod)
  
     
      const {ADD_CAN_DATE_INI, ADD_CAN_DATE_END} = calendarPreRegistration.dataValues
    

      

      if (currentDate >=  ADD_CAN_DATE_INI && currentDate <= ADD_CAN_DATE_END && currentHour >= hourIni && currentHour <= hourFin) {
        next()
        return
      }

      if (currentDate < ADD_CAN_DATE_INI  ) {
        res.status(400).json({messagge:"El proceso de adiciones y cancelaciones todavia no ha comenzado"})
        return  
      }
      if (currentDate > ADD_CAN_DATE_INI  ) {
        res.status(400).json({messagge:"El proceso de adicioness y cancelaciones ha finalizado"})
        return   
      }

    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}

module.exports = {
    verifyAddCancelation
};
