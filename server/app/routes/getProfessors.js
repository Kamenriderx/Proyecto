const express = require('express');
const router = express.Router()
const {getProfessorsCtrl} = require("../controllers/getProfessors");

router.get("/",getProfessorsCtrl);

module.exports = router
