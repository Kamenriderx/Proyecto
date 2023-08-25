const express = require('express');
const router = express.Router()
const {getProfessorsCtrl,registerProfessorCtrl,registerStudentsCtrl,getStudents, updateProfessor, deleteProfessor} = require("../controllers/admin");


const  upload = require("../middlewares/upload");
const {validatorRegisterProfessor} = require("../middlewares/validations");

router.get("/getProfessors",getProfessorsCtrl);
router.get("/getStudents",getStudents);










router.post("/registerProfessor",upload.single("file"),validatorRegisterProfessor,registerProfessorCtrl)
router.post("/registerStudents",registerStudentsCtrl);
router.put("/updateProfessor/:idUser", upload.single("file"),validatorRegisterProfessor,updateProfessor)
router.delete("/deleteProfessor/:idUser",deleteProfessor)

module.exports = router











module.exports = router
