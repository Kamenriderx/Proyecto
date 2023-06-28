const express = require('express');
const router = express.Router();


router.get('/perfil', (req, res) => {
    res.send('Bienvenido a tu perfil')
});

module.exports = router;