const express = require('express');
const router = express.Router();
const { login, verifyLoginStatus } = require('../controllers/rteLogin');

// Ruta para iniciar sesión
router.post('/lg', login);

// Ruta para verificar el estado de inicio de sesión
router.get('/verify-login-status', verifyLoginStatus);

module.exports = router;