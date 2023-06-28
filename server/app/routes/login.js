const express = require('express');
const router = express.Router();
const { login, verifyLoginStatus, loginAccess } = require('../controllers/login');

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
router.get('/verify-login-status', verifyLoginStatus);

module.exports = router;