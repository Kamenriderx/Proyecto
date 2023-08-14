const connection = require("../../config/database");

exports.getSectionsForProfessor = async function (req, res) {
    try {
        const { idUser, idPeriod } = req.params;

        const query = `
            SELECT s.DAYS, s.SECTION_CODE, s.START_TIME, s.END_TIME, s.SPACE_AVAILABLE,
                   c.CODE_COURSE, c.NAME,
                   cl.NUMBER AS CLASSROOM_NUMBER
            FROM SECTION s
            INNER JOIN COURSE c ON s.ID_COURSE = c.ID_COURSE
            INNER JOIN PROFESSOR p ON s.ID_PROFFERSSOR = p.ID_PROFFERSSOR
            INNER JOIN CLASSROOM cl ON s.ID_CLASSROOM = cl.ID_CLASSROOM
            WHERE p.ID_USER = :idUser AND s.ID_PERIOD = :idPeriod;
        `;

        const sections = await connection.query(query, {
            replacements: { idUser, idPeriod },
            type: connection.QueryTypes.SELECT,
        });

        res.json(sections);
    } catch (error) {
        console.error("Error al obtener las secciones", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
