const express = require('express');
const router = express.Router()
const {getClassrooms} = require("../controllers/classroom.js");



router.get("/listClassrooms",getClassrooms);

module.exports = router

