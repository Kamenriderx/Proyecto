const express = require('express');
const router = express.Router()
const {listCourses} = require("../controllers/course.js");



router.get("/listCourses/:id",listCourses);

module.exports = router

