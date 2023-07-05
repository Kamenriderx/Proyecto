const express = require('express');
const router = express.Router();
const {createContactRequest, acceptContactRequest, rejectContactRequest, 
        cancelContactRequest, getUserContacts, getPendingContactRequests} = require('../controllers/contacts');

// Ruta para enviar una solicitud de contacto
router.post('/contact-requests', createContactRequest);

// Ruta para aceptar una solicitud de contacto
router.put('/contact-requests/:requestId/accept', acceptContactRequest);

// Ruta para rechazar una solicitud de contacto
router.put('/contact-requests/:requestId/reject', rejectContactRequest);

// Ruta para cancelar una solicitud de contacto por parte del remitente
router.put('/contact-requests/:requestId/cancel', cancelContactRequest);

// Ruta para obtener todas las solicitudes de contacto de un usuario
router.get('/:userId', getUserContacts);

// Ruta para obtener todas las solicitudes de contacto de un usuario
router.get('/requestspendings/:recipientId', getPendingContactRequests);

module.exports = router;