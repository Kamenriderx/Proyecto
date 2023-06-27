const express = require('express');
const router = express.Router();
const {getUsers,sendRestoreEmail,restorePassword} = require('../controllers/resetPassword');
const authToken = require("../middlewares/authToken");

router.get('/getUsers', getUsers);
router.put('/sendRestoreEmail/:ACCOUNT_NUMBER', sendRestoreEmail);
router.put('/:token',authToken,restorePassword);

module.exports = router;