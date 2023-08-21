const express = require('express');
const router = express.Router();
const {classStudent, updateEvaluation, getEvaluationsByStudentId} = require("../controllers/evaluateProffesor");

router.get("/:idStudent", classStudent);
router.post("/evaluate/:idSection", updateEvaluation);

router.get("/evaluations/:idStudent", getEvaluationsByStudentId);

module.exports = router;
