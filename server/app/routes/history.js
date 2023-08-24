const express = require('express');
const router = express.Router();
const {getHistory,searchHistory} = require("../controllers/history")
const authToken = require("../middlewares/authToken")
router.get("/getHistory",authToken,getHistory);
router.post("/searchHistory",searchHistory);

module.exports = router;