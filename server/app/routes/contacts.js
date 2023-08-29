const express = require('express');
const router = express.Router();
const {createContactRequest, acceptContactRequest, rejectContactRequest, 
        cancelContactRequest, getContacts, getPendingContactRequests,getRequests, deleteContact} = require('../controllers/contacts');


// Ruta para obtener todos los contactos de un usuario
router.get('/:userId', getContacts);

// Ruta para enviar una solicitud de contacto
router.post('/contact-requests', createContactRequest);

// Ruta para aceptar una solicitud de contacto
router.put('/contact-requests/:requestId/accept', acceptContactRequest);

// Ruta para obtener todas las solicitudes referentes a un usuario
router.get('/requests/:userId', getRequests);

// Ruta para rechazar una solicitud de contacto
router.put('/contact-requests/:requestId/reject', rejectContactRequest);

// Ruta para cancelar una solicitud de contacto por parte del remitente
router.put('/contact-requests/:requestId/cancel', cancelContactRequest);

// Ruta para obtener todas las solicitudes de contacto de un usuario
router.get('/requestspendings/:recipientId', getPendingContactRequests);

// Ruta para eliminar un contacto
router.delete('/deleteContact/:userID/:contactID', deleteContact);

module.exports = router;