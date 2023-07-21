const express = require('express');
const router = express.Router()
const {getClassrooms} = require("../controllers/classroom.js");
const authMiddleware = require('../middlewares/authentication.js');
const {checkRolJefe} = require('../middlewares/rol.js');


router.get("/listClassrooms/:id",authMiddleware, checkRolJefe,getClassrooms);

module.exports = router

