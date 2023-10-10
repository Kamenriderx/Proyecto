const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/registerUser'); 

// Ruta para registrar un nuevo usuario (POST /api/users/register)
router.post('/register', registerUser);

module.exports = router;