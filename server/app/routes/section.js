const express = require('express');
const router = express.Router()
const {createSection,listSections, getProfessorsByCenterAndCarrer, deleteSection, updateSection} = require("../controllers/section.js");
const authMiddleware = require('../middlewares/authentication.js');
const {checkRolJefe} = require('../middlewares/rol.js');

router.get("/getSections",authMiddleware,listSections);
router.get("/getProfessorsByCenterCareer",authMiddleware, checkRolJefe,getProfessorsByCenterAndCarrer);

router.post("/createSection",authMiddleware, checkRolJefe,createSection);


router.delete("/deleteSection/:id",authMiddleware, checkRolJefe,deleteSection)
router.put("/updateSection/:id",authMiddleware, checkRolJefe,updateSection)
module.exports = router

