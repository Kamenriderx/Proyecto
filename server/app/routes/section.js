const express = require('express');
const router = express.Router()
const {createSection} = require("../controllers/section.js");



router.post("/createSection",createSection);

module.exports = router

