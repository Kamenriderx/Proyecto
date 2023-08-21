const connection = require('../../config/database');
const Evaluation = require('../models/evaluateProfessor');
const { Op } = require('sequelize');

//! Controlador que obtiene las secciones matriculadas de un estudiante en específico
exports.classStudent = async function (req, res) {
    const idStudent = req.params.idStudent;
  
    try {
      const query = `
        SELECT
          a.ID_SECTION,
          c.CODE_COURSE,
          c.NAME AS COURSE_NAME,
          a.SECTION_CODE,
          u.NAME AS NAME_PROFFESOR,
          e.CALIFICATION,
          e.OBS AS OBSERVATION
        FROM
          ENROLLMENT e
          INNER JOIN SECTION a ON a.ID_SECTION = e.ID_SECTION
          INNER JOIN COURSE c ON c.ID_COURSE = a.ID_COURSE
          INNER JOIN PROFESSOR p ON p.ID_PROFFERSSOR = a.ID_PROFFERSSOR
          INNER JOIN USER_ u ON u.ID_USER = p.ID_USER
        WHERE
          e.ID_STUDENT = :idStudent
          AND e.STATE = 'Matriculada';
      `;
  
      const results = await connection.query(query, {
        replacements: { idStudent },
        type: connection.QueryTypes.SELECT,
      });
  
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ error: 'No se encontraron secciones matriculadas para este estudiante' });
      }
    } catch (error) {
      console.error('Error al obtener las secciones matriculadas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  //! Controlador para evaluar docente
  exports.updateEvaluation = async function (req, res) {
    const { idSection } = req.params;
  const {
    ID_STUDENT,RESP_1, RESP_2, RESP_3, RESP_4, RESP_5, RESP_6, RESP_7, RESP_8,
    RESP_9, RESP_10, RESP_11, RESP_12, RESP_13, RESP_14, RESP_15, RESP_16,
    RESP_17, RESP_18, RESP_19, RESP_20, RESP_21, RESP_22, RESP_23, RESP_24,
    RESP_25, RESP_26, RESP_27, RESP_28
  } = req.body;

  // Verifica que todas las preguntas y el ID_STUDENT estén presentes en el cuerpo de la solicitud
  const requiredFields = [
    ID_STUDENT,
    RESP_1, RESP_2, RESP_3, RESP_4, RESP_5, RESP_6, RESP_7, RESP_8,
    RESP_9, RESP_10, RESP_11, RESP_12, RESP_13, RESP_14, RESP_15, RESP_16,
    RESP_17, RESP_18, RESP_19, RESP_20, RESP_21, RESP_22, RESP_23, RESP_24,
    RESP_25, RESP_26, RESP_27, RESP_28
];

  const missingFields = requiredFields.filter(field => field === undefined);

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Faltan campos requeridos en la solicitud: ${missingFields.join(', ')}` });
    }

  try {
    // Consulta la tabla Section para obtener los valores necesarios
    const sectionData = await connection.query(
      "SELECT ID_PERIOD, ID_PROFFERSSOR, ID_COURSE FROM Section WHERE ID_SECTION = ?",
      {
        replacements: [idSection],
        type: connection.QueryTypes.SELECT
      }
    );

    if (sectionData.length === 0) {
      return res.status(404).json({ error: "La sección no existe" });
    }

    // Verifica si ya se a evaluado 
    const existingEvaluation = await Evaluation.findOne({
        where: {
          ID_SECTION: idSection,
          EVALUATED: true 
        }
      });
  
      if (existingEvaluation) {
        return res.status(400).json({ error: "Evaluación completada con exito" });
      }

    // Crea una nueva evaluación
    const createdEvaluation = await Evaluation.create({
      ID_PERIOD: sectionData[0].ID_PERIOD,
      ID_PROFFERSSOR: sectionData[0].ID_PROFFERSSOR,
      ID_COURSE: sectionData[0].ID_COURSE,
      ID_SECTION: idSection,
      ID_STUDENT,RESP_1, RESP_2, RESP_3, RESP_4, RESP_5, RESP_6, RESP_7, RESP_8,
      RESP_9, RESP_10, RESP_11, RESP_12, RESP_13, RESP_14, RESP_15, RESP_16,
      RESP_17, RESP_18, RESP_19, RESP_20, RESP_21, RESP_22, RESP_23, RESP_24,
      RESP_25, RESP_26, RESP_27, RESP_28,
      EVALUATED: true 
    });

    return res.status(201).json(createdEvaluation);
  } catch (error) {
    console.error("Error al crear la evaluación:", error);
    return res.status(500).json({ error: "Error al crear la evaluación" });
  }
};

//! Evaluaciones hechas por estudiante
exports.getEvaluationsByStudentId = async (req, res) => {
  const { idStudent } = req.params;

  try {
    const evaluations = await Evaluation.findAll({
      where: {
        ID_STUDENT: idStudent,
      },
    });

    res.status(200).json(evaluations);
  } catch (error) {
    console.error('Error al obtener evaluaciones:', error);
    res.status(500).json({ message: 'Error al obtener evaluaciones' });
  }
};

