const express = require('express');
const router = express.Router()
const authMiddleware = require('../middlewares/authentication');
const { createdChat, getConversations, searchChats } = require('../controllers/conversation');

// controllers 
 

// nueva conversacion

router.post("/", createdChat)
// obtener chats de un usuario
router.get("/:id/:page",getConversations)
//  buscar chats
router.get("/search", searchChats);
module.exports = router