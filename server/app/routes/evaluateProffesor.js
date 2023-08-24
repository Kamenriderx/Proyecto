const express = require('express');
const router = express.Router();
const {classStudent, updateEvaluation, getEvaluationsByStudentId, getProfessorEvaluations} = require("../controllers/evaluateProffesor");

router.get("/:idStudent", classStudent);
router.post("/evaluate/:idSection", updateEvaluation);

router.get("/evaluations/:idStudent", getEvaluationsByStudentId);

router.get("/department/:idPeriod/:idUser", getProfessorEvaluations)
module.exports = router;
