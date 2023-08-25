const express = require('express');
const router = express.Router()
const {getData} = require("../controllers/statistics");

router.get("/getData",getData);

module.exports = router
