const express = require('express');
const router = express.Router();
const {createContactRequest, acceptContactRequest, rejectContactRequest, 
        cancelContactRequest, getContacts, getPendingContactRequests,getRequests} = require('../controllers/contacts');

// Ruta para enviar una solicitud de contacto
router.post('/new-request', createContactRequest);

// Ruta para aceptar una solicitud de contacto
router.put('/contact-requests/:requestId/accept', acceptContactRequest);

// Ruta para obtener todas las solicitudes referentes a un usuario
router.get('/requests/:userId', getRequests);

// Ruta para rechazar una solicitud de contacto
router.put('/request/:requestId/reject', rejectContactRequest);

// Ruta para cancelar una solicitud de contacto por parte del remitente
router.put('/request/:requestId/cancel', cancelContactRequest);

// Ruta para obtener todas las solicitudes de contacto de un usuario
router.get('/:userId', getContacts);

// Ruta para obtener todas las solicitudes de contacto de un usuario
router.get('/requestspendings/:recipientId', getPendingContactRequests);

module.exports = router;