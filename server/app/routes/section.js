const express = require('express');
const router = express.Router()
const {createSection,listSections, getProfessorsByCenterAndCarrer, deleteSection, updateSection, listSectionsPeriod} = require("../controllers/section.js");
const {detailsSection, getEnrolledStudents, getWaitingStudents, updateStudentStatus} =  require('../controllers/detailsSection.js');

const authMiddleware = require('../middlewares/authentication.js');
const {checkRolJefe} = require('../middlewares/rol.js');

router.get("/getSections",authMiddleware,listSections);
router.get("/getSectionsPeriod/:id",authMiddleware,listSectionsPeriod);
router.get("/getProfessorsByCenterCareer",authMiddleware, checkRolJefe,getProfessorsByCenterAndCarrer);

router.post("/createSection",authMiddleware, checkRolJefe,createSection);


router.post("/deleteSection/:id",authMiddleware, checkRolJefe,deleteSection)
router.put("/updateSection/:id",authMiddleware, checkRolJefe,updateSection)

// Ruta para obtener detalles de una seccion por id
router.get("/sections/:idSection", detailsSection);

// Ruta que obtiene alumnos matriculados de una seccion
router.get("/studentsEnrolled/:idSection", getEnrolledStudents)

// Ruta que obtiene estudiantes en espera de una seccion
router.get("/studentsWaiting/:idSection", getWaitingStudents)

// Ruta para forzar matricula
router.post("/updateState/:idStudent", updateStudentStatus)

module.exports = router

