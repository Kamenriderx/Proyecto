const express = require('express');
const router = express.Router()
const {getStudents, getStudentsEnrollmentPeriod, getEnrollmentsStudent, getInfoAccount} = require("../controllers/student");

router.get("/getStudents",getStudents);

router.get("/getStudentsEnrollmentPeriod/:idPeriod/:idUser",getStudentsEnrollmentPeriod)
router.get("/getEnrollmentsStudent/:idStudent/:idUser",getEnrollmentsStudent)
router.get("/getInfoAccount/:idUser",getInfoAccount)




module.exports = router
