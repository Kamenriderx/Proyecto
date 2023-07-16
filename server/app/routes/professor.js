const express = require('express');
const router = express.Router();
const { getProfessorsByCareer } = require('../controllers/professors');

// Ruta para obtener profesores por carrera
router.get('/professorsCareer/:userId', getProfessorsByCareer);

module.exports = router; 