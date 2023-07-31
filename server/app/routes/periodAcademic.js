const express = require('express');
const router = express.Router();
const {createPeriodAcademic, getValidYears} = require('../controllers/periodAcademic');

// Ruta para crear un período académico (POST request)
router.post('/', createPeriodAcademic);
router.get('/years', getValidYears);

module.exports = router;
