const { Op } = require("sequelize")
const { getStudent, getStudentById, getPhotos } = require("../helpers/repositoryRequest")
const { Career, Course, Section, Professor, PeriodAcademic, User } = require("../models")
const { getServiceCourses, getCareer, getMyCoursesArea, getServicesAreas } = require("../helpers/repositoryCourses")
const { getMyCourseEnded, getMyIndexAcademic, getMyCoursePeriodPrev, getMyCourseAproved } = require("../helpers/repositorySections")
const { getQuantityEnrollmentsCourse, getSpaceAvailableAndUv, getSectionEnrollmentStudent, verifySections, saveEnrollment, getQuantityEnrollmentsWaitCourse, getCurrentPeriod, getSectionWaitingStudent, cancelInscription, getAllSectionsEnrollmentsStudent, getSectionById } = require("../helpers/repositoryEnrollment")

const { getAcademicPeriodDetails } = require("../middlewares/indexAcademic")

const getEnrollmentAreas = async (req,res)=>{
    try {
        
        const {idUser} = req.params 
        const student = await getStudent(idUser)
        const myCareer = await Career.findOne({attributes:["ID_CAREER","NAME"],
            where:{
                NAME:{
                    [Op.like]:`${student.CAREER}`
                }
            }
        })
        const areas = await getServicesAreas(myCareer)
        

        let careere = {ID_CAREER: myCareer.ID_CAREER, NAME:myCareer.NAME}
        
        areas.map(area=>{
            delete area.dataValues.COURSEs
        })
        areas.push(careere)
        res.status(200).json({areas})
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO_SALIO_MAL"})
    }

}
const enrolmentCourse = async (req,res)=>{
    try {

        const {body} = req
        const {idUser} = req.params 
        const student = await getStudent(idUser)
        const enrollments = await getAllSectionsEnrollmentsStudent(student.ID_STUDENT)
        const quantity = await getQuantityEnrollmentsCourse(body.ID_SECTION)
        const section = await getSectionById(body.ID_SECTION);
        body.ID_STUDENT = student.ID_STUDENT
        body.ARRIVAL_NUMBER = quantity + 1
        const {spaceAvailable,uvSection } = await getSpaceAvailableAndUv(body.ID_SECTION)
        let data = []
        
        
        if (enrollments.length > 0) {
            data = await verifySections(enrollments, body.ID_SECTION)
            if (data.length >0 ) {
                if (data[0].STATE == "En Espera" && data[0].seccion.ID_SECTION != body.ID_SECTION) {
                    res.status(400).json({messagge:`Tiene traslape de horario con la seccion ${data[0].seccion.course.CODE_COURSE} ${data[0].seccion.course.NAME} que está en lista de espera`})
                    return    
                }
                if (data[0].seccion.ID_SECTION == body.ID_SECTION && data[0].STATE == "En Espera" ) {
                    res.status(400).json({messagge:`la seccion ${data[0].seccion.course.CODE_COURSE} ${data[0].seccion.course.NAME} ya la tienes matriculada en lista de espera`})
                    return    
                }

                if (data[0].seccion.ID_SECTION == body.ID_SECTION && data[0].STATE == "Matriculada" ) {
                    res.status(400).json({messagge:`la seccion ${data[0].seccion.course.CODE_COURSE} ${data[0].seccion.course.NAME} ya la tienes matriculada`})
                    return    
                }

                if (data[0].STATE == "Matriculada" && data[0].seccion.ID_SECTION != body.ID_SECTION) {
                    res.status(400).json({messagge:`Tiene traslape de horario con la seccion ${data[0].seccion.course.CODE_COURSE} ${data[0].seccion.course.NAME}`})
                    return    
                }


                res.status(400).json({messagge:`Tiene traslape de horario con la seccion ${data[0].seccion.course.CODE_COURSE} ${data[0].seccion.course.NAME}`})
                return
            }
            
        }

        if (spaceAvailable == 0) {
            res.status(400).json({messagge:"La sección no tiene cupos disponibles"})
            return
            
        }
        
        if (uvSection > student.UV_AVAILABLE) {
            res.status(400).json({messagge:"No tienes la cantidad de unidades valorativas suficientes"})
            return
            
        }



        await saveEnrollment(body)







        
        
        res.status(200).json({messagge:"Matricula correcta"})
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO_SALIO_MAL"})
    }
    
}
const enrolmentWaitCourse = async (req,res)=>{
    try {

        const {body} = req
        const {idUser} = req.params 
        const student = await getStudent(idUser)
        const enrollments = await getAllSectionsEnrollmentsStudent(student.ID_STUDENT)
        const quantity = await getQuantityEnrollmentsWaitCourse(body.ID_SECTION)
        body.ID_STUDENT = student.ID_STUDENT
        body.ARRIVAL_NUMBER = quantity + 1
        const {spaceAvailable,uvSection } = await getSpaceAvailableAndUv(body.ID_SECTION)
        let data = []
        
        
        if (enrollments.length > 0) {
            data = await verifySections(enrollments, body.ID_SECTION)
            if (data.length >0 ) {
                if (data[0].STATE == "En Espera" && data[0].seccion.ID_SECTION != body.ID_SECTION) {
                    
                    res.status(400).json({messagge:`Tiene traslape de horario con la seccion ${data[0].seccion.course.CODE_COURSE} ${data[0].seccion.course.NAME} que está en lista de espera`})
                    return    
                }
                if (data[0].seccion.ID_SECTION == body.ID_SECTION && data[0].STATE == "En Espera" ) {
                    res.status(400).json({messagge:`la seccion ${data[0].seccion.course.CODE_COURSE} ${data[0].seccion.course.NAME} ya la tienes matriculada en lista de espera`})
                    return    
                }

                if (data[0].seccion.ID_SECTION == body.ID_SECTION && data[0].STATE == "Matriculada" ) {
                    res.status(400).json({messagge:`la seccion ${data[0].seccion.course.CODE_COURSE} ${data[0].seccion.course.NAME} ya la tienes matriculada`})
                    return    
                }

                if (data[0].STATE == "Matriculada" && data[0].seccion.ID_SECTION != body.ID_SECTION) {
                    res.status(400).json({messagge:`Tiene traslape de horario con la seccion ${data[0].seccion.course.CODE_COURSE} ${data[0].seccion.course.NAME}`})
                    return    
                }


                res.status(400).json({messagge:`Tiene traslape de horario con la seccion ${data[0].seccion.course.CODE_COURSE} ${data[0].seccion.course.NAME}`})
                return
            }
            
        }

       
        
        if (uvSection > student.UV_AVAILABLE) {
            res.status(400).json({messagge:"No tienes la cantidad de unidades valorativas suficientes"})
            return
            
        }


        body.STATE = "En Espera"
        await saveEnrollment(body)







        
        
        res.status(200).json({messagge:"clase matriculada en espera"})
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO_SALIO_MAL"})
    }
    
}


const listCoursesArea = async (req,res)=>{
    try {
        const {idCareer, idStudent} = req.params
        const career = await getCareer(idCareer);
        const student = await getStudent(idStudent)
        const courseAproved = await getMyCourseAproved(idStudent)
        let coursesArea = await getServiceCourses(idCareer)
        if (career.NAME == student.CAREER.toUpperCase()) {
            coursesArea = await getMyCoursesArea(idCareer)
            
        }

        let courses = coursesArea.filter( (course)=>{

            const hasPassed = !courseAproved.rows.some(aprovedCourse => aprovedCourse.course.ID_COURSE === course.ID_COURSE)
            
            if (hasPassed) {
                return hasPassed;
                
            }
            if (course.requirement.lenght == 0) {
                return true
                
            }
            
        })

        courses = courses.filter( (course) => {
            const {requirement} = course.dataValues
            return requirement.every(requirementCourse =>{
                return courseAproved.rows.some(aprovedCourse => aprovedCourse.course.ID_COURSE == requirementCourse.REQUIREMENT_ID_COURSE)})

        })


        

       
        
       
        res.status(200).json({courses})
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO_SALIO_MAL"})
    }
    
}


const getSectionsByIdCourse= async(req,res)=>{
    try {

        const {idCourse}= req.params
        const {user} = req
        
        let sections = await Section.findAll({attributes:["ID_SECTION","DAYS",
        "SECTION_CODE",
        "START_TIME",
        "END_TIME",
        "SPACE_AVAILABLE"],where:{
            ID_COURSE:idCourse
        }, include:[
            {model:Professor, as:"Proffessor", attributes:["INSTITUTIONAL_EMAIL"], include:[{model:User, as:"user", required: true,where:{
                CENTER: {[Op.like]: user.CENTER}
            }, attributes:["NAME","CENTER"]}]},
            {model:Course, as:"course",attributes:["CODE_COURSE","NAME","UV"]},
            {model:PeriodAcademic, as:"period", required:true, where:{
                STATUS:"En curso"
            }}
        ]})


        sections =sections.filter((seccion)=>{

            return seccion.Proffessor != null

        })

        res.status(200).json({sections})
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO_SALIO_MAL"})
    }
}

const getInfoAcademicStudent = async (req,res)=>{
    try {
        const {idUser} = req.params
        const student = await getStudent(idUser)
        const courses = await getMyCourseEnded(student.ID_STUDENT)
        const multimedia = await getPhotos(idUser) 
        const currentPeriod= await getCurrentPeriod()
        let indexAcademicGlobal = 0
        let indexAcademicPeriod = 0
        indexAcademicGlobal = await getMyIndexAcademic(courses) || 0
        if(currentPeriod){
            const {previousPeriod} = await getAcademicPeriodDetails(currentPeriod.ID_PERIOD)
            const coursesPeriodPrev = await getMyCoursePeriodPrev(student.ID_STUDENT,previousPeriod)

            indexAcademicPeriod = await getMyIndexAcademic(coursesPeriodPrev) || 0
        }

        let currentYear = new Date().getFullYear()

        res.status(200).json({indexAcademicGlobal, indexAcademicPeriod, name:student.user.NAME, career:student.CAREER, center:student.user.CENTER, accountNumber:student.user.ACCOUNT_NUMBER, uvAvailabe : student.UV_AVAILABLE, year: currentYear, multimedia  })
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}
 
const getStudentEnrollmentCourses = async (req,res)=>{
    try {
        const {idUser} = req.params
        const student = await getStudent(idUser)
        const courses = await getSectionEnrollmentStudent(student.ID_STUDENT)
        
        res.status(200).json({courses})
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}
const getStudentWaitingCourses = async (req,res)=>{
    try {
        const {idUser} = req.params
        const student = await getStudent(idUser)
        const courses = await getSectionWaitingStudent(student.ID_STUDENT)
        
        res.status(200).json({courses})
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}
const cancelledEnrollment = async (req,res)=>{
    try {
        const {idEnrollment, idUser} = req.params

        await cancelInscription(idEnrollment, idUser)
        res.status(200).json({messagge:"matricula cancelada exitosamente"})
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}
const verifyEnrollment = async (req,res)=>{
    try {
        
        res.status(200).json({messagge:"acceso concedido"})
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"ALGO SALIO MAL"})
    }
}
 
module.exports = {
    getEnrollmentAreas,
    enrolmentCourse,
    enrolmentWaitCourse,
    listCoursesArea,
    getSectionsByIdCourse,
    getInfoAcademicStudent,
    getStudentEnrollmentCourses,
    getStudentWaitingCourses,
    cancelledEnrollment,
    verifyEnrollment
};
