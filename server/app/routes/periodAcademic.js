const express = require('express');
const router = express.Router();
const {createPeriodAcademic, getValidYears, deletePeriodAcademic, getPeriodsByYear, getAllPeriodsDetails, editPeriod, getYears, getAcademicPeriodDetails, getPeriodsById, getCalendarForPortal} = require('../controllers/periodAcademic');

router.post('/', createPeriodAcademic);
router.get('/yearsValids', getValidYears);
router.delete('/delete/:periodId', deletePeriodAcademic);
router.get('/periods/:year', getPeriodsByYear);
router.get('/allperiods', getAllPeriodsDetails);
router.put('/editPeriod/:periodId', editPeriod);
router.get('/years', getYears);
router.get('/calendar/:id', getAcademicPeriodDetails);
router.get('/periods/: periodId' , getPeriodsById);
router.get('/getCalendar', getCalendarForPortal);

module.exports = router;