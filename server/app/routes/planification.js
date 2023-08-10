const express = require('express');
const router = express.Router();
const {getPeriods  } = require('../controllers/planification');

// Ruta para obtener profesores por carrera
router.get('/getPeriods', getPeriods);

module.exports = router; 