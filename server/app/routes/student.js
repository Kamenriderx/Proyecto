const express = require('express');
const router = express.Router()
const {getStudents, getStudentsEnrollmentPeriod, getEnrollmentsStudent} = require("../controllers/student");

router.get("/getStudents",getStudents);

router.get("/getStudentsEnrollmentPeriod/:idPeriod/:idUser",getStudentsEnrollmentPeriod)
router.get("/getEnrollmentsStudent/:idStudent",getEnrollmentsStudent)




module.exports = router
