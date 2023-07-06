const ContactRequest = require('../models/contactRequests');
const User = require('../models/user');
const sendMail = require('../../utils/sendMail');
const Contacts = require('../models/contacts')
const connection = require("../../config/database");

//! Controlador para enviar solicitudes
exports.createContactRequest = async function(req, res) {
  try {
    const { senderId, recipientId } = req.body;

    // Verifica si el remitente y el destinatario son el mismo usuario
    if (senderId === recipientId) {
      return res.status(400).json({ message: 'No puedes enviar una solicitud de contacto a ti mismo' });
    }
    
    // Verifica si la solicitud de contacto ya existe
    const existingRequest = await ContactRequest.findOne({
      where: {
        SENDER_ID: senderId,
        RECIPIENT_ID: recipientId,
      },
    });

    // Verifica si existe una solicitud de contacto mutua
    const mutualRequest = await ContactRequest.findOne({
      where: {
        SENDER_ID: recipientId,
        RECIPIENT_ID: senderId,
      },
    });
    if (existingRequest || mutualRequest) {
      if (existingRequest && existingRequest.STATUS === 'rejected') {
        // Actualiza el estado de la solicitud existente a "pending"
        await existingRequest.update({ STATUS: 'pending' });
        // Envia un correo electrónico al destinatario
        const recipient = await User.findByPk(recipientId);
        const sender = await User.findByPk(senderId);
        const emailOptions = {
          subject: 'Nueva solicitud de contacto',
        };
        const emailParams = {
          recipientName: recipient.NAME,
          recipientId: recipient.ID_USER,
          senderName: sender.NAME,
          senderCenter: sender.CENTER,
        };
        await sendMail(recipient.EMAIL, emailOptions, 'contactRequest', emailParams);
        return res.status(200).json({ message: 'Se ha enviado una nueva solicitud de contacto' });
      } else if (mutualRequest && mutualRequest.STATUS === 'pending') {
        return res.status(400).json({ message: 'Ya existe una solicitud de contacto mutua entre estos usuarios' });
      } else if (mutualRequest && mutualRequest.STATUS !== 'pending') {
        // Actualiza el estado de la solicitud mutua a "pending"
        await mutualRequest.update({ STATUS: 'pending' });
        // Envia un correo electrónico al destinatario
        const recipient = await User.findByPk(recipientId);
        const sender = await User.findByPk(senderId);
        const emailOptions = {
          subject: 'Nueva solicitud de contacto',
        };
        const emailParams = {
          recipientName: recipient.NAME,
          recipientId: recipient.ID_USER,
          senderName: sender.NAME,
          senderCenter: sender.CENTER,
        };
        await sendMail(recipient.EMAIL, emailOptions, 'contactRequest', emailParams);
        return res.status(200).json({ message: 'Se ha enviado una nueva solicitud de contacto' });
      } else {
        return res.status(400).json({ message: 'Ya existe una solicitud de contacto entre estos usuarios' });
      }
    }

    // Crea la solicitud de contacto si no existe
    const newContactRequest = await ContactRequest.create({
      SENDER_ID: senderId,
      RECIPIENT_ID: recipientId,
      STATUS: 'pending', // Establece el estado como "pending" una vez la solicitud ha sido enviada
    });

    const requestId = newContactRequest.ID_CREQUEST; // Obtiene el ID_CREQUEST creado
    const status = newContactRequest.STATUS;   //Obtiene el estado de la solicitud

    // Obtiene datos de Sender y Recipient
    const recipient = await User.findByPk(recipientId);
    const sender = await User.findByPk(senderId);

    // Envia un correo electrónico al destinatario
    const emailOptions = {
      subject: 'Nueva solicitud de contacto',
    };
    const emailParams = {
      recipientName: recipient.NAME,
      recipientId: recipient.ID_USER,
      senderName: sender.NAME,
      senderCenter: sender.CENTER,
    };
    await sendMail(recipient.EMAIL, emailOptions, 'contactRequest', emailParams);

    return res.status(201).json({ message: 'Solicitud de contacto creada exitosamente'}, requestId, status);
  } catch (error) {
    console.error('Error al crear la solicitud de contacto:', error);
    return res.status(500).json({ message: 'Error al crear la solicitud de contacto' });
  }
}

//! Controlador para aceptar solicitudes de contacto
exports.acceptContactRequest = async function(req, res) {
  try {
    const { requestId } = req.params;

    // Obtiene la solicitud de contacto por su ID
    const contactRequest = await ContactRequest.findByPk(requestId);

    if (!contactRequest) {
      return res.status(404).json({ message: 'La solicitud de contacto no existe' });
    }

    if (contactRequest.STATUS === 'rejected') {
      return res.status(400).json({ message: 'La solicitud de contacto ya a sido rechazada' });
    }

    if (contactRequest.STATUS === 'accepted') {
      return res.status(400).json({ message: 'La solicitud de contacto ya ha sido aceptada' });
    }

    // Actualiza el estado de la solicitud a "accepted"
    contactRequest.STATUS = 'accepted';
    await contactRequest.save();

    // Obtiene los datos del remitente y destinatario
    const recipient = await User.findByPk(contactRequest.RECIPIENT_ID);
    const sender = await User.findByPk(contactRequest.SENDER_ID);

    // Crea el registro en la tabla "contacts"
    await Contacts.create({
      USER_ID: sender.ID_USER,
      CONTACT_ID: recipient.ID_USER,
    });

    // Envia correo electrónico al remitente
    const emailOptions = {
      subject: 'Solicitud de contacto aceptada',
    };

    const emailParams = {
      recipientName: recipient.NAME,
      recipientCenter: recipient.CENTER,
      senderName: sender.NAME,
      senderId: sender.ID_USER,
    };

    await sendMail(sender.EMAIL, emailOptions, 'contactRequestAccepted', emailParams);

    return res.status(200).json({ message: 'Solicitud de contacto aceptada' });
  } catch (error) {
    console.error('Error al aceptar la solicitud de contacto:', error);
    return res.status(500).json({ message: 'Error al aceptar la solicitud de contacto' });
  }
}

//! Controlador para declinar una solicitud de contacto
exports.rejectContactRequest = async function(req, res) {
  try {
    const { requestId } = req.params;

    // Obtiene la solicitud de contacto por su ID
    const contactRequest = await ContactRequest.findByPk(requestId);

    if (!contactRequest) {
      return res.status(404).json({ message: 'La solicitud de contacto no existe' });
    }

    // Verifica si la solicitud de contacto ya ha sido aceptada
    if (contactRequest.STATUS === 'accepted') {
      return res.status(400).json({ message: 'La solicitud de contacto ya ha sido aceptada' });
    }

    // Verifica si la solicitud de contacto está en estado "pending"
    if (contactRequest.STATUS !== 'pending') {
      return res.status(400).json({ message: 'La solicitud de contacto no está en estado "pending"' });
    }

    // Actualiza el estado de la solicitud a "rejected"
    contactRequest.STATUS = 'rejected';
    await contactRequest.save();


    return res.status(200).json({ message: 'Solicitud de contacto rechazada' });
  } catch (error) {
    console.error('Error al rechazar la solicitud de contacto:', error);
    return res.status(500).json({ message: 'Error al rechazar la solicitud de contacto' });
  }
}

//! Controlador para cancelar una solicitud de contacto
exports.cancelContactRequest = async function(req, res) {
  try {
    const { requestId } = req.params;

    // Obtiene la solicitud de contacto por su ID
    const contactRequest = await ContactRequest.findByPk(requestId);

    if (!contactRequest) {
      return res.status(404).json({ message: 'La solicitud de contacto no existe' });
    }

    // Verifica si la solicitud de contacto ya ha sido aceptada o rechazada
    if (contactRequest.STATUS === 'accepted') {
      return res.status(400).json({ message: 'La solicitud de contacto ya ha sido aceptada' });
    }

    if (contactRequest.STATUS === 'rejected') {
      return res.status(400).json({ message: 'La solicitud de contacto ya ha sido rechazada' });
    }

    // Elimina la solicitud de contacto
    await contactRequest.destroy();

    return res.status(200).json({ message: 'Solicitud de contacto cancelada' });
  } catch (error) {
    console.error('Error al cancelar la solicitud de contacto:', error);
    return res.status(500).json({ message: 'Error al cancelar la solicitud de contacto' });
  }
}

//! Controlador para obtener los contactos de un usuario
exports.getContacts = async function(req, res) {
  try {
    const { userId } = req.params;
    let userContacts;

    if (userId) {
      // Consulta para obtener los contactos en CONTACT_ID de un USER_ID
      userContacts = await connection.query(
        'SELECT user_.NAME, user_.CENTER, user_.ACCOUNT_NUMBER ' +
        'FROM contacts ' +
        'INNER JOIN user_ ON contacts.CONTACT_ID = user_.ID_USER ' +
        'WHERE contacts.USER_ID = :userId',
        {
          type: connection.QueryTypes.SELECT,
          replacements: { userId },
        }
      );

      // Consulta para obtener los contactos en USER_ID de un CONTACT_ID
      const contactContacts = await connection.query(
        'SELECT user_.NAME, user_.CENTER, user_.ACCOUNT_NUMBER ' +
        'FROM contacts ' +
        'INNER JOIN user_ ON contacts.USER_ID = user_.ID_USER ' +
        'WHERE contacts.CONTACT_ID = :userId',
        {
          type: connection.QueryTypes.SELECT,
          replacements: { userId },
        }
      );

      // Asignar los contactos de CONTACT_ID a userContacts
      userContacts = userContacts.concat(contactContacts);
    }

    return res.status(200).json({ contacts: userContacts });
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    return res.status(500).json({ message: 'Error al obtener los contactos' });
  }
};

//! Controlador para obtener las solicitudes pendientes del destinatario
exports.getPendingContactRequests = async function (req, res) {
  try {
    const { recipientId } = req.params;

    console.log(req.params)

    // Busca todas las solicitudes pendientes del destinatario
    const pendingRequests = await ContactRequest.findAll({
      where: {
        RECIPIENT_ID: recipientId,
        STATUS: 'pending',
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['NAME', 'ACCOUNT_NUMBER'],
        },
      ],
      attributes: ['ID_CREQUEST', 'CREATED_AT'],
    });

    // Mapea los datos necesarios de cada solicitud
    const requestData = pendingRequests.map((request) => {
      return {
        requestId: request.ID_CREQUEST,
        senderName: request.sender.NAME,
        senderAccountNumber: request.sender.ACCOUNT_NUMBER,
        sentDate: request.CREATED_AT,
      };
    });

    return res.status(200).json({ pendingRequests: requestData });
  } catch (error) {
    console.error('Error al obtener las solicitudes pendientes del destinatario:', error);
    return res.status(500).json({ message: 'Error al obtener las solicitudes pendientes del destinatario' });
  }
};