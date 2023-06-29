const express = require('express');
const router = express.Router();
const { loginAccess, verifyToken } = require('../controllers/authenticateUsers');

// Ruta para iniciar sesión de los Usuarios
router.post('/students', loginAccess);
router.get('/students', (req, res) => {
    res.send('Bienvenidos al login de estudiantes')
})

router.post('/professors', loginAccess);
router.get('/professors', (req, res) => {
    res.send('Bienvenidos al login de profesores')
})

router.post('/admins', loginAccess);
router.get('/admins', (req, res) => {
    res.send('Bienvenidos al login de administradores')
})

// Ruta para verificar el estado de inicio de sesión
router.get('/profileStudents', verifyToken, (req, res) => {
    res.render('profile')
});

module.exports = router;