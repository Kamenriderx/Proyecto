const express = require('express');
const router = express.Router()
const {registerStudentsCtrl} = require('../controllers/registerStudent');



router.post("/",registerStudentsCtrl);

module.exports = router
