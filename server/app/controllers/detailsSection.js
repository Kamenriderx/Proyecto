const { Op } = require('sequelize');
const Section = require('../models/section');
const Enrollment = require('../models/enrollment');
const Professor = require('../models/professor');
const Classroom = require('../models/classroom');
const User = require('../models/user');
const Course = require('../models/course');
const connection = require('../../config/database');

//! Obtiene los detalles de una seccion
exports.detailsSection = async function (req, res) {
  const idSection = req.params.idSection;

  try {
    const query = `
      SELECT
        c.NAME AS courseName,
        s.SECTION_CODE AS sectionNumber,
        SUM(CASE WHEN e.STATE = 'En Espera' THEN 1 ELSE 0 END) AS totalWaitlist,
        SUM(CASE WHEN e.STATE = 'Matriculada' THEN 1 ELSE 0 END) AS totalEnrolled,
        u.NAME AS professorName
      FROM
        SECTION s
        INNER JOIN COURSE c ON s.ID_COURSE = c.ID_COURSE
        INNER JOIN CLASSROOM cl ON s.ID_CLASSROOM = cl.ID_CLASSROOM
        INNER JOIN PROFESSOR p ON s.ID_PROFFERSSOR = p.ID_PROFFERSSOR
        INNER JOIN USER_ u ON p.ID_USER = u.ID_USER
        LEFT JOIN ENROLLMENT e ON s.ID_SECTION = e.ID_SECTION
        WHERE s.ID_SECTION = :idSection
      GROUP BY
        c.NAME, cl.NUMBER, u.NAME;
    `;

    const [results] = await connection.query(query, {
      replacements: { idSection },
      type: connection.QueryTypes.SELECT,
    });

    if (results) {
      res.json(results);
    } else {
      res.status(404).json({ error: 'Sección no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener los detalles de la sección:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

//! Controlador que obtiene los matriculados de una seccion en especifico
exports.getEnrolledStudents = async function (req, res) {
  const idSection = req.params.idSection;

  try {
    const query = `
      SELECT
        u.NAME AS STUDENT_NAME,
        u.ACCOUNT_NUMBER,
        s.INSTITUTIONAL_EMAIL,
        s.CAREER,
        u.CENTER,
        e.ARRIVAL_NUMBER,
        e.CALIFICATION,
        e.OBS
      FROM
        ENROLLMENT e
        INNER JOIN STUDENT s ON e.ID_STUDENT = s.ID_STUDENT
        INNER JOIN USER_ u ON s.ID_USER = u.ID_USER
      WHERE
        e.ID_SECTION = :idSection
        AND e.STATE = 'Matriculada';
    `;

    const [results] = await connection.query(query, {
      replacements: { idSection },
      type: connection.QueryTypes.SELECT,
    });

    if (results) {
      res.json(results);
    } else {
      res.status(404).json({ error: 'No se encontraron alumnos matriculados para esta sección' });
    }
  } catch (error) {
    console.error('Error al obtener los detalles de matriculados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

//! Controlador que obtiene los matriculados de una seccion en especifico
exports.getWaitingStudents = async function (req, res) {
  const idSection = req.params.idSection;

  try {
    const query = `
      SELECT
        u.NAME AS STUDENT_NAME,
        u.ACCOUNT_NUMBER,
        s.INSTITUTIONAL_EMAIL,
        s.CAREER,
        u.CENTER,
        e.ARRIVAL_NUMBER,
        e.CALIFICATION,
        e.OBS
      FROM
        ENROLLMENT e
        INNER JOIN STUDENT s ON e.ID_STUDENT = s.ID_STUDENT
        INNER JOIN USER_ u ON s.ID_USER = u.ID_USER
      WHERE
        e.ID_SECTION = :idSection
        AND e.STATE = 'En Espera';
    `;

    const [results] = await connection.query(query, {
      replacements: { idSection },
      type: connection.QueryTypes.SELECT,
    });

    if (results) {
      res.json(results);
    } else {
      res.status(404).json({ error: 'No se encontraron alumnos en lista de espera para esta sección' });
    }
  } catch (error) {
    console.error('Error al obtener los detalles de matriculados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}