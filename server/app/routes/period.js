const express = require('express');
const { getPeriodInfo } = require('../controllers/period');
const router = express.Router()


router.get("/getPeriodCurrent",getPeriodInfo)


module.exports = router