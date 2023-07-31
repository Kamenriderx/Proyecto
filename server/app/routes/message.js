const express = require('express');
const router = express.Router()
const authMiddleware = require('../middlewares/authentication');
// controller
const {createMessage, getMessagesChat} = require('../controllers/message');


// ADD
router.post("/add" ,createMessage)
// GET
router.get("/:id_conversation/:page",getMessagesChat) 





module.exports = router