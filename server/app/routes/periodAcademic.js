const express = require('express');
const router = express.Router();
const {createPeriodAcademic, getValidYears, deletePeriodAcademic, getPeriodsByYear, getAllPeriodsDetails, editPeriod, getYears} = require('../controllers/periodAcademic');

// Ruta para crear un período académico (POST request)
router.post('/', createPeriodAcademic);
router.get('/yearsValids', getValidYears);
router.delete('/delete/:periodId', deletePeriodAcademic);
router.get('/periods/:year', getPeriodsByYear);
router.get('/allperiods', getAllPeriodsDetails);
router.put('/editPeriod/:periodId', editPeriod);
router.get('/years', getYears)

module.exports = router;