const express = require('express');
const router = express.Router();
const {classStudent, updateEvaluation, getEvaluationsByStudentId, getProfessorEvaluations, getProfessorProfilePicture} = require("../controllers/evaluateProffesor");

router.get("/:idStudent", classStudent);
router.post("/evaluate/:idSection", updateEvaluation);

router.get("/evaluations/:idStudent", getEvaluationsByStudentId);

router.get("/department/:idPeriod/:idUser", getProfessorEvaluations)

router.get("/video/:idUser", getProfessorProfilePicture)

module.exports = router;