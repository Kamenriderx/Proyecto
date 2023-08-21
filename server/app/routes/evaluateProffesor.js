const express = require('express');
const router = express.Router();
const {classStudent, updateEvaluation} = require("../controllers/evaluateProffesor");

router.get("/:idStudent", classStudent)
router.post("/evaluate/:idSection", updateEvaluation)

module.exports = router;
