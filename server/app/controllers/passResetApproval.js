const User = require("../models/user");
const sendMail = require("../../utils/sendMail");

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
      attributes: ["NAME", "ID_ROLE", "EMAIL"],
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

    // Enviar correo electrónico de notificación
    const emailOptions = {
      subject: "Restablecimiento de contraseña aprobado",
    };

    const emailParams = {
      approveName: aprobador.NAME,
      recipientName: person.NAME,
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
