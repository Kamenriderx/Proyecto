const express = require('express');
const router = express.Router()
const {getRolesCtrl} = require("../controllers/role.js");




router.get("/getRoles",getRolesCtrl);

module.exports = router
