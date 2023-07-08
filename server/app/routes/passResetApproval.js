const express = require('express');
const router = express.Router();
const {resetApprove} = require('../controllers/passResetApproval');

// Ruta para aprobar el restablecimiento
router.post('/:idUserRestore/:idUserApprover', resetApprove);

module.exports = router;