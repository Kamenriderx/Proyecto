const Enrollment = require("../models/enrollment");
const connection = require("../../config/database");
const sendMail = require("../../utils/sendMail");

//! Controlador para subir notas a registro
exports.createEnrollment = async function (req, res) {
    try {
        const idSection = req.params.idSection;
        const enrollments = req.body;
    
        // Consulta para obtener las fechas de inicio y fin de registro de notas
        const sectionDatesQuery = `
                SELECT NOTES_UPLOAD_REGISTRATION_START_DATE, NOTES_UPLOAD_REGISTRATION_END_DATE
                FROM detailsPeriod
                WHERE ID_PERIOD = (SELECT ID_PERIOD FROM SECTION WHERE ID_SECTION = :idSection)
            `;
    
        const sectionDatesResults = await connection.query(sectionDatesQuery, {
          replacements: { idSection: idSection },
          type: connection.QueryTypes.SELECT,
        });
    
        if (sectionDatesResults.length === 0) {
          return res.status(404).json({ error: "Sección no encontrada." });
        }
    
        const {
          NOTES_UPLOAD_REGISTRATION_START_DATE,
          NOTES_UPLOAD_REGISTRATION_END_DATE,
        } = sectionDatesResults[0];
    
        const formattedDate = new Date();
        const currentDate = formattedDate.toLocaleString("en-US", {
          timeZone: "America/Managua",
          hour12: false,
        });
    
        const formattedStartDate =
          NOTES_UPLOAD_REGISTRATION_START_DATE.toLocaleString("en-US", {
            timeZone: "UTC",
            hour12: false,
          });
        const formattedEndDate = NOTES_UPLOAD_REGISTRATION_END_DATE.toLocaleString(
          "en-US",
          { timeZone: "UTC", hour12: false }
        );
    
        if (currentDate < formattedStartDate || currentDate > formattedEndDate) {
          return res
            .status(400)
            .json({ error: "El período de subida de notas aún no ha comenzado." });
        }
    
        for (const enrollmentData of enrollments) {
          const { ID_ENROLLMENT, OBS, CALIFICATION } = enrollmentData;
    
          const enrollmentQuery = `
                    SELECT *
                    FROM ENROLLMENT
                    WHERE ID_ENROLLMENT = :idEnrollment AND ID_SECTION = :idSection
                `;
    
          const enrollmentResults = await connection.query(enrollmentQuery, {
            replacements: { idEnrollment: ID_ENROLLMENT, idSection: idSection },
            type: connection.QueryTypes.SELECT,
          });
    
      if (enrollmentResults.length === 0) {
        return res
          .status(404)
          .json({
            error: `Inscripción no encontrada para ID ${ID_ENROLLMENT} e ID de sección ${ID_SECTION}.`,
          });
      }

      let STATE;
      if (CALIFICATION >= 1 && CALIFICATION <= 30) {
        if (OBS === "APR" || OBS === "NCP") {
          return res
            .status(400)
            .json({
              error:
                "Para calificación menor o igual a 30, la observación no puede ser 'APR' o 'NCP'.",
            });
        }
        STATE = "Finalizada";
      } else if (CALIFICATION > 30 && CALIFICATION <= 64) {
        if (OBS === "ABD" || OBS === "NCP") {
          return res
            .status(400)
            .json({
              error:
                "Para calificación mayor a 30 y menor o igual a 64, la observación no puede ser 'ABD' o 'NCP'.",
            });
        }
        STATE = "Finalizada";
      } else if (CALIFICATION >= 65 && CALIFICATION <= 100) {
        if (OBS !== "APR") {
          return res
            .status(400)
            .json({
              error:
                "Para calificación mayor o igual a 65, la observación debe ser 'APR'.",
            });
        }
        STATE = "Finalizada";
      } else if (CALIFICATION === 0) {
        if (OBS === "APR") {
          return res
            .status(400)
            .json({
              error:
                "Para calificación igual a 0, la observación no puede ser 'APR'.",
            });
        }
        STATE = "Finalizada";
      } else {
        return res
          .status(400)
          .json({ error: "Valor incorrecto de observación o calificación." });
      }

      await Enrollment.update(
        { OBS, CALIFICATION, STATE },
        { where: { ID_ENROLLMENT } }
      );

      const studentIdQuery = `
                SELECT ID_STUDENT
                FROM ENROLLMENT
                WHERE ID_ENROLLMENT = :idEnrollment AND ID_SECTION = :idSection
            `;

      const studentIdResults = await connection.query(studentIdQuery, {
        replacements: { idEnrollment: ID_ENROLLMENT, idSection: idSection },
        type: connection.QueryTypes.SELECT,
      });

      if (studentIdResults.length === 0) {
        return res
          .status(404)
          .json({
            error: `Estudiante no encontrado para ID de inscripción ${ID_ENROLLMENT} e ID de sección ${ID_SECTION}.`,
          });
      }

      const studentId = studentIdResults[0].ID_STUDENT;

      // Consulta para obtener el ID_USER del estudiante
      const userIdQuery = `
SELECT ID_USER
FROM STUDENT
WHERE ID_STUDENT = :studentId
`;

      const userIdResults = await connection.query(userIdQuery, {
        replacements: { studentId: studentId },
        type: connection.QueryTypes.SELECT,
      });

      if (userIdResults.length === 0) {
        return res
          .status(404)
          .json({
            error: `Estudiante no encontrado para ID de estudiante ${studentId}.`,
          });
      }

      const userId = userIdResults[0].ID_USER;

      // Consulta para obtener los datos del estudiante 
      const studentEmailQuery = `
    SELECT EMAIL, NAME, ACCOUNT_NUMBER
    FROM USER_
    WHERE ID_USER = :userId
`;

      const studentEmailResults = await connection.query(studentEmailQuery, {
        replacements: { userId: userId },
        type: connection.QueryTypes.SELECT,
      });

      if (studentEmailResults.length === 0) {
        return res
          .status(404)
          .json({
            error: `Estudiante no encontrado para ID de usuario ${userId}.`,
          });
      }

      const { EMAIL, NAME, ACCOUNT_NUMBER } = studentEmailResults[0];

      const sectionCourseQuery = `
                SELECT SECTION.SECTION_CODE, COURSE.NAME
                FROM SECTION
                JOIN COURSE ON SECTION.ID_COURSE = COURSE.ID_COURSE
                WHERE SECTION.ID_SECTION = :idSection
            `;

      const sectionCourseResults = await connection.query(sectionCourseQuery, {
        replacements: { idSection: idSection },
        type: connection.QueryTypes.SELECT,
      });

      if (sectionCourseResults.length === 0) {
        return res
          .status(404)
          .json({
            error: `Sección no encontrada para ID de sección ${idSection}.`,
          });
      }

      const { SECTION_CODE, NAME: COURSE_NAME } = sectionCourseResults[0];

      const emailOptions = {
        subject: "Notificación de calificación",
      };

      // Fecha actual
      const formattedDate = currentDate.toLocaleString("en-US", {
        timeZone: "America/Managua",
      });

      const emailParams = {
        calification: CALIFICATION,
        obs: OBS,
        recipientName: NAME,
        accountNumber: ACCOUNT_NUMBER,
        sectionCode: SECTION_CODE,
        courseName: COURSE_NAME,
        fecha: formattedDate,
      };

      await sendMail(EMAIL, emailOptions, "sendNotesStudent", emailParams);
    }

    return res.status(200).json({ message: "Subida de notas con éxito." });
  } catch (error) {
    console.error("Error al subir la matrícula:", error);
    return res.status(500).json({ error: "Error interno en el servidor." });
  }
};
