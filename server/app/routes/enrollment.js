const express = require('express');
const router = express.Router()
const authMiddleware = require('../middlewares/authentication.js');
const authToken = require("../middlewares/authToken.js");
const { verifyPaymentEnrollment } = require('../middlewares/paymentEnrrollment.js');
const { verifyIndexAcademic } = require('../middlewares/indexAcademic.js');
const {getEnrollmentAreas,enrollmentPayment, enrolmentCourse, listCoursesArea, getSectionsByIdCourse, enrolmentWaitCourse, getInfoAcademicStudent, getStudentEnrollmentCourses, getStudentWaitingCourses, cancelledEnrollment, verifyEnrollment, specialCancelledEnrollment} = require('../controllers/enrollments.js');
const { verifyAddCancelation } = require('../middlewares/addCancelation.js');


// enpoint para generar matricula
router.post("/inscription/:idUser",verifyPaymentEnrollment, verifyIndexAcademic , verifyEnrollment);
// enpoint para cancelaciones normales
router.post("/addCancelation/:idUser",verifyPaymentEnrollment,verifyAddCancelation , verifyEnrollment);
router.post("/form003/:idUser",verifyPaymentEnrollment , verifyEnrollment);
// enpoint para matricular una clase
router.post("/inscriptionCourse/:idUser",verifyPaymentEnrollment , enrolmentCourse);

// enpoint para matricular una clase en lista de espera
router.post("/inscriptionCourseWait/:idUser",verifyPaymentEnrollment , enrolmentWaitCourse);
// enpoint para cancelar una clase 
router.post("/canceledInscription/:idEnrollment/:idUser" ,cancelledEnrollment);
router.post("/canceledInscriptionSpecial/:idEnrollment/:idUser" ,specialCancelledEnrollment);

// listar las areas en que matricula el estudiante
router.get("/listAreas/:idUser", getEnrollmentAreas)

// listar las clases de una area en especifica 
router.get("/listCoursesArea/:idCareer/:idStudent",listCoursesArea )

// obtener secciones de una clase
router.get("/getCourseSections/:idCourse", authMiddleware ,getSectionsByIdCourse )
// obtener info basica del estudiante
router.get("/infoStudent/:idUser", getInfoAcademicStudent )
// obtener clases matriculadas 
router.get("/enrollmentCourses/:idUser", getStudentEnrollmentCourses )
// obtener clases en lista de espera
router.get("/waitingCourses/:idUser", getStudentWaitingCourses )
router.get("/getListPayment", authToken,enrollmentPayment )


module.exports = router

