const Professor = require('../models/Professor'); // Importa el modelo Professor
const User = require('../models/user');
const { Op } = require('sequelize');
const connection = require("../../config/database");

// Controlador para obtener registros de profesores basado en la CAREER
exports.getProfessorsByCareer = async function (req, res) {
    const userId = req.params.userId;
  
    try {
      const user = await connection.query(
        'SELECT NAME, ACCOUNT_NUMBER, CENTER FROM USER_ WHERE ID_USER = :userId AND ID_ROLE = 3',
        {
          replacements: { userId },
          type: connection.QueryTypes.SELECT
        }
      );
  
      if (!user || user.length === 0) {
        return res.status(404).json([]); // Si no se encuentra el usuario o no tiene el ID_ROLE = 3, se retorna un array vacío
      }
  
      const professor = await connection.query(
        'SELECT * FROM PROFESSOR WHERE ID_USER = :userId',
        {
          replacements: { userId },
          type: connection.QueryTypes.SELECT
        }
      );
  
      if (!professor || professor.length === 0) {
        return res.status(404).json([]); // Si no se encuentra el profesor, se retorna un array vacío
      }
  
      const professorsWithSameCareer = await connection.query(
        'SELECT PROFESSOR.*, USER_.NAME, USER_.ACCOUNT_NUMBER, USER_.CENTER FROM PROFESSOR INNER JOIN USER_ ON PROFESSOR.ID_USER = USER_.ID_USER WHERE PROFESSOR.CAREER = :career AND PROFESSOR.ID_USER <> :userId',
        {
          replacements: { career: professor[0].CAREER, userId },
          type: connection.QueryTypes.SELECT
        }
      );
  
      return res.json(professorsWithSameCareer);
    } catch (error) {
      console.error('Error al obtener los profesores por carrera:', error);
      return res.status(500).json({ error: 'Error al obtener los profesores por carrera' });
    }
  };
  
  
  
  
  
  