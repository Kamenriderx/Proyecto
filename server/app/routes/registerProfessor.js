const express = require('express');
const router = express.Router()
const {registerProfessorCtrl} = require("../controllers/registerProfessor");
const  upload = require("../middlewares/upload");
const {validatorRegisterProfessor} = require("../middlewares/validations");



router.post("/",upload.single("File"),validatorRegisterProfessor,registerProfessorCtrl)

module.exports = router
