const connection = require('../../config/database');
const Evaluation = require('../models/evaluateProfessor');
const Sequelize = require('sequelize');
const Op = require('sequelize');
const Professor = require("../models/professor");
const User = require("../models/user");
const Student = require("../models/student");
const Course = require("../models/course");
const Section = require("../models/section.js");
const Multimedia = require("../models/multimedia");

//! Controlador que obtiene las secciones matriculadas de un estudiante en específico
exports.classStudent = async function (req, res) {
    const idStudent = req.params.idStudent;
  
    try {
      const query = `
        SELECT
          p.ID_PROFFERSSOR,
          p.ID_USER AS ID_USER_PROFFESOR,
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
    ID_STUDENT, RESP_1, RESP_2, RESP_3, RESP_4, RESP_5, RESP_6, RESP_7, RESP_8,
    RESP_9, RESP_10, RESP_11, RESP_12, RESP_13, RESP_14, RESP_15, RESP_16,
    RESP_17, RESP_18, RESP_19, RESP_20, RESP_21, RESP_22, RESP_23, RESP_24,
    RESP_25, RESP_26, RESP_27, RESP_28
  } = req.body;

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

    // Verifica si ya se ha evaluado
    const existingEvaluation = await Evaluation.findOne({
      where: {
        ID_SECTION: idSection,
        EVALUATED: true
      }
    });

    if (existingEvaluation) {
      return res.status(400).json({ error: "Ya existe una evaluacion." });
    }

    // Verifica que todas las preguntas estén llenas
    const requiredFields = [
      ID_STUDENT,
      RESP_1, RESP_2, RESP_3, RESP_4, RESP_5, RESP_6, RESP_7, RESP_8,
      RESP_9, RESP_10, RESP_11, RESP_12, RESP_13, RESP_14, RESP_15, RESP_16,
      RESP_17, RESP_18, RESP_19, RESP_20, RESP_21, RESP_22, RESP_23, RESP_24,
      RESP_25, RESP_26, RESP_27, RESP_28
    ];

    const missingFields = requiredFields.filter(field => field === undefined);

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Faltan campos requeridos en la solicitud.` });
    }

    // Obtiene el ID_PROFFESSOR de los valores de la sección
    const ID_PROFFESSOR = sectionData[0].ID_PROFFERSSOR;

    // Busca la carrera del profesor en la tabla Professor
    const professor = await Professor.findByPk(ID_PROFFESSOR);

    if (!professor) {
      return res.status(404).json({ error: "No se encontró el profesor." });
    }

    // Obtiene la carrera del profesor
    const PROFESSOR_CAREER = professor.CAREER;

    // Crea una nueva evaluación
    const createdEvaluation = await Evaluation.create({
      ID_PERIOD: sectionData[0].ID_PERIOD,
      ID_PROFFERSSOR: ID_PROFFESSOR,
      ID_COURSE: sectionData[0].ID_COURSE,
      ID_SECTION: idSection,
      ID_STUDENT, RESP_1, RESP_2, RESP_3, RESP_4, RESP_5, RESP_6, RESP_7, RESP_8,
      RESP_9, RESP_10, RESP_11, RESP_12, RESP_13, RESP_14, RESP_15, RESP_16,
      RESP_17, RESP_18, RESP_19, RESP_20, RESP_21, RESP_22, RESP_23, RESP_24,
      RESP_25, RESP_26, RESP_27, RESP_28,
      PROFESSOR_CAREER,
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

//! Obtiene evaluaciones de docentes por Jefe de Departamento
exports.getProfessorEvaluations = async function (req, res) {
  try {
    const { idPeriod, idUser } = req.params;

    // Buscar al profesor por ID_USER en la tabla Professor
    const professor = await Professor.findOne({ where: { ID_USER: idUser } });

    if (!professor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }

    // Career del profesor
    const professorCareer = professor.CAREER;

    // Evaluaciones del profesor en el periodo y carrera
    const evaluations = await Evaluation.findAll({
      where: {
        ID_PERIOD: idPeriod,
        PROFESSOR_CAREER: { [Sequelize.Op.like]: `%${professorCareer}%` },
      },
    });

    // Nombre del profesor
    const evaluationsWithProfessorName = await Promise.all(
      evaluations.map(async (evaluation) => {
        const professorRecord = await Professor.findByPk(evaluation.ID_PROFFERSSOR);
        if (!professorRecord) {
          return {
            ...evaluation.toJSON(),
            PROFESSOR_NAME: 'Nombre del profesor no encontrado',
          };
        }
        const professorUser = await User.findOne({ where: { ID_USER: professorRecord.ID_USER } });
        return {
          ...evaluation.toJSON(),
          PROFESSOR_NAME: professorUser ? professorUser.NAME : 'Nombre del profesor no encontrado',
        };
      })
    );

    // Nombre del estudiante 
    const evaluationsWithStudentNames = await Promise.all(
      evaluationsWithProfessorName.map(async (evaluation) => {
        const student = await Student.findOne({ where: { ID_STUDENT: evaluation.ID_STUDENT } });
        if (!student) {
          return {
            ...evaluation,
            STUDENT_NAME: 'Nombre del estudiante no encontrado',
          };
        }
        const studentUser = await User.findOne({ where: { ID_USER: student.ID_USER } });
        return {
          ...evaluation,
          STUDENT_NAME: studentUser ? studentUser.NAME : 'Nombre del estudiante no encontrado',
        };
      })
    );

    // Nombre del curso
    const evaluationsWithCourseNames = await Promise.all(
      evaluationsWithStudentNames.map(async (evaluation) => {
        const course = await Course.findByPk(evaluation.ID_COURSE);
        if (!course) {
          return {
            ...evaluation,
            COURSE_NAME: 'Nombre del curso no encontrado',
          };
        }
        return {
          ...evaluation,
          COURSE_NAME: course.NAME,
        };
      })
    );

    // Código de la sección 
    const evaluationsWithSectionCode = await Promise.all(
      evaluationsWithCourseNames.map(async (evaluation) => {
        const section = await Section.findByPk(evaluation.ID_SECTION);
        if (!section || section.ID_COURSE !== evaluation.ID_COURSE) {
          return {
            ...evaluation,
            SECTION_CODE: 'Código de la sección no encontrado',
          };
        }
        return {
          ...evaluation,
          SECTION_CODE: section.SECTION_CODE,
        };
      })
    );

    res.json(evaluationsWithSectionCode); 
  } catch (error) {
    console.error('Error al obtener las evaluaciones:', error);
    res.status(500).json({ message: 'Error al obtener las evaluaciones' });
  }
};

//! Video del perfil
exports.getProfessorProfilePicture = async function (req, res) {
  try {
    const { idUser } = req.params;

    // Buscar la multimedia con IS_PROFILE igual a 1 y ID_USER igual al idUser
    const profileImage = await Multimedia.findOne({
      where: {
        ID_USER: idUser,
        IS_PROFILE: 1,
      },
    });

    if (!profileImage) {
      return res.status(404).json({ message: 'Imagen de perfil no encontrada' });
    }

    const imageUrl = profileImage.URL;

    res.json({ imageUrl });
  } catch (error) {
    console.error('Error al obtener la imagen de perfil:', error);
    res.status(500).json({ message: 'Error al obtener la imagen de perfil' });
  }
};