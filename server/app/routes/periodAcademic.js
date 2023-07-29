const express = require('express');
const router = express.Router();
const {createPeriodAcademic, getValidYears, deletePeriodAcademic, getPeriodsByYear} = require('../controllers/periodAcademic');

// Ruta para crear un período académico (POST request)
router.post('/', createPeriodAcademic);
router.get('/years', getValidYears);
router.delete('/delete/:periodId', deletePeriodAcademic)
router.get('/periods/:year', getPeriodsByYear)

module.exports = router;