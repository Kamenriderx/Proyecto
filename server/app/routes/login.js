const express = require('express');
const router = express.Router();
const { loginAccess, verifyToken } = require('../controllers/authenticateUsers');

// Ruta para iniciar sesión de los Usuarios
router.post('/students', loginAccess);
router.get('/students', (req, res) => {
    res.send('Bienvenidos al login de Estudiantes')
})

router.post('/professors', loginAccess);
router.get('/professors', (req, res) => {
    res.send('Bienvenidos al login de Docentes')
})

router.post('/departmentHeads', loginAccess);
router.get('/departmentHeads', (req, res) => {
    res.send('Bienvenidos al login de Jefes de Departamento')
})

router.post('/coordinators', loginAccess);
router.get('/coordinators', (req, res) => {
    res.send('Bienvenidos al login de Coordinadores')
})

router.post('/admins', loginAccess);
router.get('/admins', (req, res) => {
    res.send('Bienvenidos al login de Administradores')
})

// Ruta para verificar el estado de inicio de sesión
router.get('/profileStudents', verifyToken, (req, res) => {
    res.render('profile')
});

module.exports = router;