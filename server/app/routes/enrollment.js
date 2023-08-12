const express = require('express');
const router = express.Router()
const authMiddleware = require('../middlewares/authentication.js');
const { verifyPaymentEnrollment } = require('../middlewares/paymentEnrrollment.js');
const { verifyIndexAcademic } = require('../middlewares/indexAcademic.js');
const {getEnrollmentAreas, enrolmentCourse, listCoursesArea, getSectionsByIdCourse, enrolmentWaitCourse, getInfoAcademicStudent, getStudentEnrollmentCourses, getStudentWaitingCourses, cancelledEnrollment, verifyEnrollment} = require('../controllers/enrollments.js');


// enpoint para generar matricula
router.post("/inscription/:idUser/:idPeriod",verifyPaymentEnrollment ,verifyIndexAcademic, verifyEnrollment);
// enpoint para matricular una clase
router.post("/inscriptionCourse/:idUser/:idPeriod",verifyPaymentEnrollment , enrolmentCourse);

// enpoint para matricular una clase en lista de espera
router.post("/inscriptionCourseWait/:idUser/:idPeriod",verifyPaymentEnrollment , enrolmentWaitCourse);
// enpoint para cancelar una clase 
router.put("/canceledInscription/:idEnrollment" , cancelledEnrollment);

// listar las areas en que matricula el estudiante
router.get("/listAreas/:idUser", getEnrollmentAreas)

// listar las clases de una area en especifica 
router.get("/listCoursesArea/:idCareer/:idStudent",listCoursesArea )

// obtener secciones de una clase
router.get("/getCourseSections/:idCourse", getSectionsByIdCourse )
// obtener info basica del estudiante
router.get("/infoStudent/:idUser", getInfoAcademicStudent )
// obtener clases matriculadas 
router.get("/enrollmentCourses/:idUser", getStudentEnrollmentCourses )
// obtener clases en lista de espera
router.get("/waitingCourses/:idUser", getStudentWaitingCourses )


module.exports = router

