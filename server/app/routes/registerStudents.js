const express = require('express');
const router = express.Router()
const {registerStudentsCtrl,getStudents} = require('../controllers/registerStudent');



router.post("/",registerStudentsCtrl);
router.get("/getStudents",getStudents);

module.exports = router
