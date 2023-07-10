const express = require('express');
const router = express.Router();
const {resetApprove, resetPassword} = require('../controllers/passResetApproval');

// Ruta para aprobar el restablecimiento
router.post('/aprove/:idUserRestore/:idUserApprover', resetApprove);

// Ruta para restablecer la contraseña
router.post('/reset-password/:token', resetPassword);

module.exports = router;