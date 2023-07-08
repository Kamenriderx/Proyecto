const User = require("../models/user");
const sendMail = require("../../utils/sendMail");
const { generateAuthToken } = require('../../utils/authToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//! Controlador para enviar mail y aprobacion con token
exports.resetApprove = async (req, res) => {
  const { idUserRestore, idUserApprover } = req.params;

  try {
    // Obtener el nombre del usuario aprobador
    const aprobador = await User.findOne({
      attributes: ["NAME", "ID_ROLE"],
      where: { ID_USER: idUserApprover },
    });

    // Validar el rol del aprobador
    if (aprobador.ID_ROLE !== 3) {
      return res
        .status(400)
        .json({ error: "El aprobador no tiene el rol adecuado." });
    }

    // Obtener los datos de la persona que recibe la aprobación
    const person = await User.findOne({
      attributes: ["NAME", "ID_ROLE", "EMAIL", "ID_USER"],
      where: {
        ID_USER: idUserRestore,
        ID_ROLE: [2, 4], // Roles permitidos para aprobar restablecimiento de contraseña: 2 o 4
      },
    });

    // Validar la existencia de la persona y su rol
    if (!person) {
      return res
        .status(400)
        .json({
          message:
            "La persona que recibe la aprobación no tiene el rol adecuado.",
        });
    }

    // Validar la dirección de correo electrónico de la persona
    if (!person.EMAIL) {
      throw new Error(
        "La persona que recibe la aprobación no tiene una dirección de correo electrónico válida."
      );
    }

    // Generar un número aleatorio de 6 dígitos como verificationCode
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Encriptar el verificationCode utilizando bcrypt
    const hashedVerificationCode = await bcrypt.hash(verificationCode.toString(), 10);

    // Actualizar el campo VERIFICATION_CODE en el modelo User con el valor encriptado
    await User.update(
      { VERIFICATION_CODE: hashedVerificationCode },
      { where: { ID_USER: idUserRestore } }
    );

    //Token 
    const token = generateAuthToken({ userId: person.ID_USER, verificationCode: verificationCode }, '2m');

     console.log(token)
    //Link 
    const resetLink = `http://localhost:5173?token=${encodeURIComponent(token)}`;

    // Enviar correo electrónico de notificación
    const emailOptions = {
      subject: "Restablecimiento de contraseña aprobado",
    };

    //Parametros en el correo
    const emailParams = {
      approveName: aprobador.NAME,
      recipientName: person.NAME,
      link: resetLink,

    };

    await sendMail(
      person.EMAIL,
      emailOptions,
      "passResetApproval",
      emailParams
    );

    res
      .status(200)
      .json({
        message:
          "Restablecimiento aprobado. Se envió un correo electrónico de notificación al usuario restaurado.",
      });
  } catch (error) {
    console.error("Error al aprobar el restablecimiento:", error);
    res.status(500).json({ error: "Error al aprobar el restablecimiento." });
  }
};

//! Controlador para cambio de contraseña por aprobacion
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Desencriptar el token y obtener los datos
    const decodedToken = jwt.verify(token, process.env.HASHPASS);
    const userId = decodedToken.userId;
    const verificationCode = decodedToken.verificationCode;

    // Validar si el token ha expirado
    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(400).json({ error: 'El token ha expirado. Solicite un nuevo restablecimiento de contraseña.' });
    }
      
    // Validar si el userId del token coincide con el de la base de datos
    const user = await User.findOne({
     where: {
        ID_USER: userId,
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token inválido. El usuario y el código de verificación no coinciden.' });
    }

    const isVerificationCodeValid = await bcrypt.compare(verificationCode.toString(), user.VERIFICATION_CODE);

    if (!isVerificationCodeValid) {
      return res.status(400).json({ error: 'Token inválido. El usuario y el código de verificación no coinciden.' });
    }

    // Generar el hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar el campo USER_PASSWORD en el modelo User
    await user.update({ USER_PASSWORD: hashedPassword });

    // Obtener los datos del usuario aprobado
    const aprobado = await User.findOne({
      attributes: ['NAME', 'EMAIL'],
      where: { ID_USER: userId },
    });

    // Enviar correo electrónico de notificación
    const emailOptions = {
      subject: 'Contraseña restablecida',
    };

    // Parametros en el correo
    const emailParams = {
      approveName: aprobado.NAME,
      password: newPassword,
    };

    await sendMail(
      aprobado.EMAIL,
      emailOptions,
      'passSucess',
      emailParams
    );

    res.status(200).json({ message: 'Contraseña restablecida con éxito.' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ error: 'Error al restablecer la contraseña.' });
  }
};