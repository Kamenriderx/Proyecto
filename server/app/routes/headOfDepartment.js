const express = require('express');
const router = express.Router();
const { getProffesorsByCarrer, getSectionsByProfessor } = require('../controllers/headOfDepartment.js');

const authMiddleware = require('../middlewares/authentication.js');
const {checkRolJefe} = require('../middlewares/rol.js');

// Ruta para obtener profesores por carrera
router.get('/getProffessorsCarrer/:idUser', getProffesorsByCarrer);
router.get("/getSectionsProfessor/:idUser", getSectionsByProfessor);




module.exports = router; 