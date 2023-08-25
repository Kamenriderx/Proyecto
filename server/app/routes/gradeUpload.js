const express = require('express');
const router = express.Router();
const {createEnrollment} = require("../controllers/gradeUpload");

router.put("/:idSection", createEnrollment);

module.exports = router;