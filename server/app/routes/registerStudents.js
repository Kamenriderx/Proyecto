const express = require('express');
const router = express.Router()
const {registerStudentsCtrl} = require('../controllers/registerStudent');



router.post("/",(req, res, next) => {console.log('Estoy pasando por aqui') 
next()},registerStudentsCtrl);

module.exports = router
