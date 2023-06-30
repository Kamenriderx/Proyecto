const express = require('express');
const router = express.Router()
const {getProfessorsCtrl,registerProfessorCtrl,registerStudentsCtrl,getStudents} = require("../controllers/admin");


const  upload = require("../middlewares/upload");
const {validatorRegisterProfessor} = require("../middlewares/validations");

router.get("/getProfessors",getProfessorsCtrl);
router.get("/getStudents",getStudents);










router.post("/registerProfessor",upload.single("file"),validatorRegisterProfessor,registerProfessorCtrl)
router.post("/registerStudents",registerStudentsCtrl);

module.exports = router











module.exports = router
