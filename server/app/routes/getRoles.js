const express = require('express');
const router = express.Router()
const {getRolesCtrl} = require("../controllers/getRoles.js");




router.get("/",getRolesCtrl);

module.exports = router
