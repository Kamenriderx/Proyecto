const express = require('express');
const router = express.Router()
const {listCourses} = require("../controllers/course.js");
const authMiddleware = require('../middlewares/authentication.js');
const {checkRolJefe} = require('../middlewares/rol.js');


router.get("/listCourses/:id",authMiddleware, checkRolJefe,listCourses);

module.exports = router

