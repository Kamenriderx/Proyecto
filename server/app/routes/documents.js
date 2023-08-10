const express = require('express');
const router = express.Router()
const {generatePDF} = require("../controllers/documents");

router.get("/getPDFPlanification",generatePDF)


module.exports = router