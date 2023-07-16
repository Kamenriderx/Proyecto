const express = require('express');
const router = express.Router();
const {getList,searchList} = require('../controllers/onlineList');

router.get('/getList',getList);
router.post('/searchList',searchList);

module.exports = router;