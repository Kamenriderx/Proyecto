const Enrollment = require('../models/enrollment');
const connection = require('../../config/database');

//! Controlador para subir notas a registro
exports.createEnrollment =  async function (req, res) {
    try {
        const idSection = req.params.idSection; 
        const enrollments = req.body; 

        // Consulta para obtener las fechas de NOTES_UPLOAD_REGISTRATION_START_DATE y NOTES_UPLOAD_REGISTRATION_END_DATE 
        const sectionDatesQuery = `
            SELECT NOTES_UPLOAD_REGISTRATION_START_DATE, NOTES_UPLOAD_REGISTRATION_END_DATE
            FROM detailsPeriod
            WHERE ID_PERIOD = (SELECT ID_PERIOD FROM SECTION WHERE ID_SECTION = :idSection)
        `;

        const sectionDatesResults = await connection.query(sectionDatesQuery, {
            replacements: { idSection: idSection },
            type: connection.QueryTypes.SELECT
        });

        if (sectionDatesResults.length === 0) {
            return res.status(404).json({ error: "Section details not found." });
        }

        const { NOTES_UPLOAD_REGISTRATION_START_DATE, NOTES_UPLOAD_REGISTRATION_END_DATE } = sectionDatesResults[0];

        const formattedDate = new Date();
        const currentDate = formattedDate.toLocaleString('en-US', { timeZone: 'America/Managua', hour12: false });

        // Convierte las fechas formato local
        const formattedStartDate = NOTES_UPLOAD_REGISTRATION_START_DATE.toLocaleString('en-US', { timeZone: 'UTC', hour12: false });
        const formattedEndDate = NOTES_UPLOAD_REGISTRATION_END_DATE.toLocaleString('en-US', { timeZone: 'UTC', hour12: false });

        console.log(formattedStartDate)
        if (currentDate < formattedStartDate || currentDate > formattedEndDate) {
            return res.status(400).json({ error: "Editing is only allowed between NOTES_UPLOAD_REGISTRATION_START_DATE and NOTES_UPLOAD_REGISTRATION_END_DATE." });
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
                type: connection.QueryTypes.SELECT
            });

            if (enrollmentResults.length === 0) {
                return res.status(404).json({ error: `Enrollment not found for ID ${ID_ENROLLMENT} and section ID ${ID_SECTION}.` });
            }

            let STATE;
            if (CALIFICATION >= 1 && CALIFICATION <= 30) {
                if (OBS === "APR" || OBS === "NCP") {
                    return res.status(400).json({ error: "Para calificación menor o igual a 30, la observación no puede ser 'APR' o 'NCP'." });
                }
                STATE = "Finalizada";
            } else if (CALIFICATION > 30 && CALIFICATION <= 64) {
                if (OBS === "ABD" || OBS === "NCP") {
                    return res.status(400).json({ error: "Para calificación mayor a 30 y menor o igual a 64, observación no puede ser 'ABD' o 'NCP'." });
                }
                STATE = "Finalizada";
            } else if (CALIFICATION >= 65 && CALIFICATION <= 100) {
                if (OBS !== "APR") {
                    return res.status(400).json({ error: "Para calificación mayor o igual a 65, observacion tiene que ser 'APR'." });
                }
                STATE = "Finalizada";
            } else if (CALIFICATION == 0) {
                if (OBS === "APR") {
                    return res.status(400).json({ error: "Para calificación igual a 0, observación no puede ser 'APR'" });
                }
                STATE = "Finalizada";
            } else {
                return res.status(400).json({ error: "Valor incorrecto de observación o calificación." });
            }

            await Enrollment.update(
                { OBS, CALIFICATION, STATE },
                { where: { ID_ENROLLMENT} }
            );
        }

        return res.status(200).json({ message: "Subida de notas con exito." });
    } catch (error) {
        console.error("Error al subir la matricula:", error);
        return res.status(500).json({ error: "Error interno sel servidor." });
    }
};
