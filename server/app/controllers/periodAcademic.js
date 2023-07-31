const PeriodAcademic = require('../models/periodAcademic');
const { Op } = require('sequelize');
const moment = require('moment');
const connection = require('../../config/database'); 

//! Controlador para crear un período académico
exports.createPeriodAcademic = async(req, res) => {
    console.log(req.body);
    try {
        const { startDate, finishDate } = req.body;
    
        // Calcula el año a partir de la fecha de inicio
        const year = new Date(startDate).getFullYear();
    
        // Validación 1: Verifica que el período esté dentro de los rangos de meses especificados
        const startMonth = new Date(startDate).getMonth() + 1;
        const endMonth = new Date(finishDate).getMonth() + 1;

        const periods = ['I Periodo', 'II Periodo', 'III Periodo'];
        let periodName = '';

        if ([1, 2, 4].includes(startMonth) && [1, 2, 4].includes(endMonth)) {
        periodName = `${periods[0]} ${year}`;
        } else if ([5, 6, 7, 8].includes(startMonth) && [5, 6, 7, 8].includes(endMonth)) {
        periodName = `${periods[1]} ${year}`;
        } else if ([9, 10, 11, 12].includes(startMonth) && [9, 10, 11, 12].includes(endMonth)) {
        periodName = `${periods[2]} ${year}`;
        } else {
        throw new Error('Fechas de inicio y fin no están en un rango válido de meses.');
        }
    
        // Validación 2: Verifica que la duración del período esté dentro del rango especificado
        const startDateObj = new Date(startDate);
        const finishDateObj = new Date(finishDate);
        const diffInMonths = (finishDateObj - startDateObj) / (1000 * 60 * 60 * 24 * 30);
    
        if (diffInMonths < 2 || diffInMonths > 3.5) {
          throw new Error('La duración del período no está dentro del rango válido (entre 2 y 3 1/2 meses).');
        }
    
        // Validación 3: Verifica que la fecha de inicio sea igual o posterior a la fecha actual
        const currentDate = new Date();
    
        if (startDateObj < currentDate) {
          throw new Error('La fecha de inicio debe ser igual o posterior a la fecha actual.');
        }
    
        // Validación 4: Verifica que no se exceda el límite de 3 períodos académicos por año
        const existingPeriods = await PeriodAcademic.findAll({
          where: {
            PERIOD_NAME: {
              [Op.substring]: `(${year})`,
            },
          },
        });
    
        if (existingPeriods.length >= 3) {
          throw new Error(`Se han alcanzado el límite de 3 períodos académicos para el año ${year}.`);
        }
    
        // Validación 5: Verifica que no existan períodos académicos con el mismo nombre
        const existingPeriodName = await PeriodAcademic.findOne({
          where: { PERIOD_NAME: periodName },
        });
    
        if (existingPeriodName) {
          throw new Error(`Ya existe un período académico con el nombre '${periodName}'.`);
        }
    
        // Crea el nuevo período académico utilizando el modelo PeriodAcademic
        const newPeriodAcademic = await PeriodAcademic.create({
          PERIOD_NAME: periodName,
          START_DATE: startDate,
          FINISH_DATE: finishDate,
        });
    
        return res.status(201).json({
          success: true,
          message: 'Período académico creado exitosamente.',
          periodAcademic: newPeriodAcademic,
        });
      } catch (error) {
        console.log("error");
        return res.status(400).json({
          success: false,
          message: 'Error al crear el período académico.',
          error: error.message,
        });
      }
    };

    //! Controlador para seleccionar año de planificacion
    exports.getValidYears = async (req, res) => {
      try {
        const currentYear = moment().year();
        const maxYearsToSend = 2;
    
        // Obtener los años válidos
        const validYears = [];
        for (let i = 0; i < maxYearsToSend; i++) {
          validYears.push(currentYear + i);
        }
    
        // Valida si los años tienen registros en el modelo PeriodAcademic
        const existingYears = await PeriodAcademic.findAll({
          where: {
            START_DATE: {
              [Op.gte]: moment().startOf('year').toDate(), // Solo registros a partir del año en curso
            },
            FINISH_DATE: {
              [Op.lte]: moment().endOf('year').add(maxYearsToSend - 1, 'years').toDate(), // Como máximo, registros hasta 2 años adelante
            },
          },
          attributes: [
            [connection.fn('DISTINCT', connection.fn('YEAR', connection.col('START_DATE'))), 'year'], 
          ],
        });
    
        const existingYearsList = existingYears.map((record) => record.get('year'));
        const errorMessage = 'Error: El año seleccionado ya tiene un registro en el modelo.';
    
        // Verifica si no hay registros existentes
        if (existingYearsList.length === 0) {
          res.json({
            validYears,
            existingYears: existingYearsList,
            errorMessage: '', // No hay error si no hay registros existentes
          });
        } else {
          res.json({
            validYears,
            existingYears: existingYearsList,
            errorMessage,
          });
        }
      } catch (error) {
        console.error("Error al obtener años:", error);
        res.status(500).json({ error: 'Error al obtener años' });
      }
    };

    
