const express = require('express');
const router = express.Router()
const {getStudents, getStudentsEnrollmentPeriod} = require("../controllers/student");

router.get("/getStudents",getStudents);

router.get("/getStudentsEnrollmentPeriod/:idPeriod/:idUser",getStudentsEnrollmentPeriod)




module.exports = router
