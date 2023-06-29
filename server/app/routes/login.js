const express = require('express');
const router = express.Router();
const { loginAccess, verifyToken } = require('../controllers/authenticateUsers');

// Ruta para iniciar sesión de los Usuarios
router.post('/students', loginAccess);
router.get('/students', (req, res) => {
    res.send('Bienvenidos al login de estudiantes')
})

router.post('/proffesors', loginAccess);
router.get('/proffesors', (req, res) => {
    res.send('Bienvenidos al login de profesores')
})

router.post('/admins', loginAccess);
router.get('/students', (req, res) => {
    res.send('Bienvenidos al login de estudiantes')
})

// Ruta para verificar el estado de inicio de sesión
router.get('/profileStudents', verifyToken, (req, res) => {
    res.render('profile')
});

module.exports = router;