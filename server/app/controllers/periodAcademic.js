const PeriodAcademic = require("../models/periodAcademic");
const { Op } = require("sequelize");
const moment = require("moment");
const connection = require("../../config/database");
const DetailsPeriod = require("../models/detailsPeriod");

//! Controlador para crear un período académico
exports.createPeriodAcademic = async (req, res) => {
  try {
    const { startDate, finishDate } = req.body;

    // Calcula el año a partir de la fecha de inicio
    const year = new Date(startDate).getFullYear();

    // Obtiene el año actual
    const currentYear = new Date().getFullYear();

    // Validación: Verifica que el año del período a crear sea igual o mayor al año actual
    if (year < currentYear || year > currentYear + 1) {
      throw new Error(
        "Solo se pueden crear períodos para el año actual o el año siguiente."
      );
    }

    // Validación 1: Verifica que el período esté dentro de los rangos de meses especificados
    const startMonth = new Date(startDate).getMonth() + 1;
    const endMonth = new Date(finishDate).getMonth() + 1;

    const periods = ["I Periodo", "II Periodo", "III Periodo"];
    let periodName = "";

    if ([1, 2, 4].includes(startMonth) && [1, 2, 4].includes(endMonth)) {
      periodName = `${periods[0]} ${year}`;
    } else if (
      [5, 6, 7, 8].includes(startMonth) &&
      [5, 6, 7, 8].includes(endMonth)
    ) {
      periodName = `${periods[1]} ${year}`;
    } else if (
      [9, 10, 11, 12].includes(startMonth) &&
      [9, 10, 11, 12].includes(endMonth)
    ) {
      periodName = `${periods[2]} ${year}`;
    } else {
      throw new Error(
        "Fechas de inicio y fin no están en un rango válido de meses."
      );
    }

    // Validación 2: Verifica que la duración del período esté dentro del rango especificado
    const startDateObj = new Date(startDate);
    const finishDateObj = new Date(finishDate);
    const diffInMonths =
      (finishDateObj - startDateObj) / (1000 * 60 * 60 * 24 * 30);

    if (diffInMonths < 3.5 || diffInMonths > 4) {
      throw new Error(
        "La duración del período no está dentro del rango válido (entre 3.5 y 4 meses)."
      );
    }

    // Validación 3: Verifica que la fecha de inicio sea igual o posterior a la fecha actual
    const currentDate = new Date();

    if (startDateObj < currentDate) {
      throw new Error(
        "La fecha de inicio debe ser igual o posterior a la fecha actual."
      );
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
      throw new Error(
        `Se han alcanzado el límite de 3 períodos académicos para el año ${year}.`
      );
    }

    // Validación 5: Verifica que no existan períodos académicos con el mismo nombre
    const existingPeriodName = await PeriodAcademic.findOne({
      where: { PERIOD_NAME: periodName },
    });

    if (existingPeriodName) {
      throw new Error(
        `Ya existe un período académico con el nombre '${periodName}'.`
      );
    }

    // Crea el nuevo período académico utilizando el modelo PeriodAcademic
    const newPeriodAcademic = await PeriodAcademic.create({
      PERIOD_NAME: periodName,
      START_DATE: startDate,
      FINISH_DATE: finishDate,
    });

    // Crea los registros del modelo DetailsPeriod para el nuevo período académico
    const detailsStartDate = moment.utc(startDate).subtract(5, "days");
    const detailsEndDate = moment.utc(detailsStartDate).add(5, "days");

    const detailsPeriodData = {
      ID_PERIOD: newPeriodAcademic.ID_PERIOD,
      PREREGISTRATION_START_DATE: detailsStartDate.hour(9).toDate(),
      PREREGISTRATION_END_DATE: detailsEndDate.hour(23).toDate(),
      REGISTRATION_START_DATE: moment.utc(startDate).add(2, "days").hour(9).toDate(),
      REGISTRATION_END_DATE: moment.utc(startDate).add(7, "days").hour(23).toDate(),
      ADD_CANCELLATIONS_START_DATE: moment
        .utc(startDate)
        .add(8, "days")
        .toDate(),
      ADD_CANCELLATIONS_END_DATE: moment
        .utc(startDate)
        .add(14, "days")
        .toDate(),
      CLASS_START_DATE: moment.utc(startDate).add(8, "days").toDate(),
      CLASS_END_DATE: moment.utc(startDate).add(88, "days").toDate(),
      REGISTRATION_PAYMENT_START_DATE: moment
        .utc(startDate)
        .subtract(5, "days")
        .toDate(),
      REGISTRATION_PAYMENT_END_DATE: moment
        .utc(startDate)
        .add(14, "days")
        .toDate(),
      LABORATORIES_PAYMENT_START_DATE: moment
        .utc(startDate)
        .add(15, "days")
        .toDate(),
      LABORATORIES_PAYMENT_END_DATE: moment
        .utc(startDate)
        .add(21, "days")
        .toDate(),
      NOTE_UPLOAD_START_DATE: moment.utc(startDate).add(82, "days").hour(9).toDate(),
      NOTE_UPLOAD_END_DATE: moment.utc(startDate).add(87, "days").hour(23).toDate(),
      NOTES_UPLOAD_REGISTRATION_START_DATE: moment
        .utc(startDate)
        .add(89, "days")
        .hour(9)
        .toDate(),
      NOTES_UPLOAD_REGISTRATION_END_DATE: moment
        .utc(startDate)
        .add(89, "days")
        .hour(23)
        .toDate(),
    };

    await DetailsPeriod.create(detailsPeriodData);

    return res.status(201).json({
      success: true,
      message: "Período académico creado exitosamente.",
      periodAcademic: newPeriodAcademic,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error al crear el período académico.",
      error: error.message,
    });
  }
};

//! Controlador pra eliminar periodos
exports.deletePeriodAcademic = async (req, res) => {
  try {
    const { periodId } = req.params;

    // Buscar el período académico por su ID
    const period = await PeriodAcademic.findByPk(periodId);

    // Si no se encuentra el período, lanzar un error
    if (!period) {
      throw new Error("El período académico no existe.");
    }

    // Validar que el período tenga el STATUS 'Por empezar'
    if (period.STATUS !== "Por empezar") {
      throw new Error(
        'Solo se pueden eliminar períodos con el STATUS "Por empezar".'
      );
    }

    // Eliminar los detalles del período
    await DetailsPeriod.destroy({
      where: {
        ID_PERIOD: periodId,
      },
    });

    // Eliminar el período académico
    await period.destroy();

    return res.status(200).json({
      success: true,
      message: "Período académico eliminado exitosamente.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error al eliminar el período académico.",
      error: error.message,
    });
  }
};

//! Controlador para obtener periodos academicos
exports.getPeriodsByYear = async function (req, res) {
  try {
    const year = req.params.year;
    // Verificar si el año es válido 
    if (!year || isNaN(year)) {
      return res.status(400).json({ error: "Año inválido" });
    }

    // Obtener los periodos académicos para el año especificado
    const periods = await PeriodAcademic.findAll({
      where: {
        START_DATE: {
          [connection.Sequelize.Op.between]: [`${year}-01-01`, `${year}-12-31`],
        },
      },
    });

    // Obtener los detalles de cada periodo académico encontrado
    const periodsWithDetails = await Promise.all(
      periods.map(async (period) => {
        const details = await DetailsPeriod.findAll({
          where: {
            ID_PERIOD: period.ID_PERIOD,
          },
        });
        return {
          period,
          details,
        };
      })
    );

    res.json(periodsWithDetails);
  } catch (error) {
    console.error("Error al obtener los periodos académicos:", error);
    res.status(500).json({ error: "Error al obtener los periodos académicos" });
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
          [Op.gte]: moment().startOf("year").toDate(), // Solo registros a partir del año en curso
        },
        FINISH_DATE: {
          [Op.lte]: moment()
            .endOf("year")
            .add(maxYearsToSend - 1, "years")
            .toDate(), // Como máximo, registros hasta 2 años adelante
        },
      },
      attributes: [
        [
          connection.fn(
            "DISTINCT",
            connection.fn("YEAR", connection.col("START_DATE"))
          ),
          "year",
        ],
      ],
    });

    const existingYearsList = existingYears.map((record) => record.get("year"));
    const errorMessage =
      "Error: El año seleccionado ya tiene un registro en el modelo.";

    // Verifica si no hay registros existentes
    if (existingYearsList.length === 0) {
      res.json({
        validYears,
        existingYears: existingYearsList,
        errorMessage: "", // No hay error si no hay registros existentes
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
    res.status(500).json({ error: "Error al obtener años" });
  }
};

//! Controlador que obtiene informacion solo de periodos
exports.getAllPeriodsDetails = async function (req, res) {
  try {
    // Obtener todos los periodos académicos
    const periods = await PeriodAcademic.findAll();

    res.json(periods);
  } catch (error) {
    console.error("Error al obtener los periodos académicos:", error);
    res.status(500).json({ error: 'Error al obtener los periodos académicos' });
  }
}

//! Controlador para editar periodos academicos
exports.editPeriod = async function (req, res) {
  try {
    const periodId = req.params.periodId;
    const updatedData = req.body;

    // Verifica si el ID del período es válido
    if (!periodId || isNaN(periodId)) {
      return res.status(400).json({ error: 'ID de período inválido' });
    }

    // Verifica si el período existe en la base de datos
    const existingPeriod = await PeriodAcademic.findOne({
      where: {
        ID_PERIOD: periodId,
      },
    });

    if (!existingPeriod) {
      return res.status(404).json({ error: 'El período académico no existe' });
    }

    // Filtrar los campos que se pueden actualizar 
    const allowedFields = [];
    const filteredData = Object.keys(updatedData).reduce((acc, key) => {
      if (allowedFields.includes(key)) {
        acc[key] = updatedData[key];
      }
      return acc;
    }, {});

    // Actualiza el período académico
    await PeriodAcademic.update(filteredData, {
      where: {
        ID_PERIOD: periodId,
      },
    });

    // Si se desean editar los detalles del período, realizar la actualización correspondiente
    if (updatedData.hasOwnProperty('details')) {
      const detailsData = updatedData.details;

      // Actualizar los detalles del período
      try {
        await DetailsPeriod.update(detailsData, {
          where: {
            ID_PERIOD: periodId,
          },
        });
      } catch (error) {
        // Captura los errores de los triggers
        console.error("Error al editar los detalles del período:", error);
        return res.status(400).json({ error: 'Error al actualizar los detalles del período' });
      }
    }

    res.json({ success: true, message: 'Período académico y detalles actualizados correctamente' });
  } catch (error) {
    console.error("Error al editar el período académico y sus detalles:", error);
    res.status(500).json({ error: 'Error al editar el período académico y sus detalles' });
  }
};

//! Controlador para obtener años
exports.getYears = (req, res) => {
  // Obtiene el año actual
  const currentYear = new Date().getFullYear();

  // Límite máximo de años a mostrar
  const maxYear = currentYear + 10; // Mostrar años hasta 10 años en el futuro

  // Lista de años a partir de 2023 hasta el límite máximo
  const years = [];
  for (let year = 2023; year <= maxYear; year++) {
    years.push(year);
  }

  // Enviar la lista de años válidos en formato JSON
  res.json({ years });
};

//! Controlador para creacion de calendario academico
exports.getAcademicPeriodDetails = async (req, res) => {
  try {
    // Obtiene el período académico por ID
    const detailsPeriod = await DetailsPeriod.findByPk(req.params.id);

    if (!detailsPeriod) {
      return res.status(404).json({ error: 'No se encontró información para el período académico especificado' });
    }

    const { REGISTRATION_START_DATE, REGISTRATION_END_DATE } = detailsPeriod;

    // Crea una lista para almacenar la información de cada día del período
    const calendar = [];
    
    // Convierte las fechas en objetos Date
    const startDate = new Date(REGISTRATION_START_DATE);
    const finishDate = new Date(REGISTRATION_END_DATE);

    // Itera sobre el rango de fechas y la información se agrega a cada día "calendar"
    let currentDate = new Date(startDate);
    let percentageIndex = 0;

    while (currentDate <= finishDate) {
      const dateLabel = formatDate(currentDate); 

      // Asigna un texto fijo
      let students = "PRIMER INGRESO";
      switch (percentageIndex) {
        case 0:
          students = "EXCELENCIA ACADEMICA (índice global de 80% a 100% y que además tengan 10 o más asignaturas aprobadas en su historial académico / REPRESENTANTES DE LA UNAH EN ASPECTOS ARTÍSTICOS, CULTURALES Y DEPORTIVOS / CONDICIONADOS /  PROSEENE / POR EGRESAR (índice global de 80% a 100% y su índice de periodo es de 0% a 100%) / PRIMER INGRESO PROVENIENTES DE OTRAS UNIVERSIDADES Y GRADUADOS DE LA UNAH";
          break;
        case 1: 
          students = "POR EGRESAR (índice global de 0% a 79% y su índice de periodo es de 0% a 100%)";
          break;
        case 2:
          students = "91% a 100%";
          break;
        case 3:
          students = "80% a 90%";
          break;
        case 4:
          students = "70% a 79%";
          break;
        default:
          students = "0% a 69%";
          break;
      }

      calendar.push({
        date: dateLabel,
        hour: "9:00 a.m A 10:59 p.m.", 
        students: students,
      });

      // Incrementa el índice de porcentaje 
      percentageIndex = (percentageIndex + 1) % 5;

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Obtiene información del período académico
    const academicPeriod = await PeriodAcademic.findByPk(req.params.id);

    if (!academicPeriod) {
      return res.status(404).json({ error: 'No se encontró información para el período académico especificado' });
    }

    // Obtiene el valor de PERIOD_NAME 
    const { PERIOD_NAME } = academicPeriod;

    // Obtiene información del período anterior
    const previousPeriod = await PeriodAcademic.findOne({
      where: {
        FINISH_DATE: {
          [Op.lt]: startDate,
        },
      },
      order: [['FINISH_DATE', 'DESC']],
      attributes: ['PERIOD_NAME'],
    });

    // Crea el objeto final con la información recopilada
    const academicPeriodDetails = {
      pac: PERIOD_NAME,
      calendar: calendar,
      previousPac: previousPeriod ? previousPeriod.PERIOD_NAME : null,
      initDate: formatDate(startDate),
      finalDate: formatDate(finishDate),
      aditionInterval: formatDate(startDate) + " al " + formatDate(finishDate), 
    };

    return res.json(academicPeriodDetails);
  } catch (error) {
    console.error('Error al obtener detalles del período académico:', error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener detalles del período académico' });
  }
};

// Formatea la fecha
const formatDate = (date) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return date.toLocaleDateString('es-ES', options);
};

//! Controlador que envia periodos por ID
exports.getPeriodsById = async function (req, res) {
  try {
    const periodId = req.params.periodId;

    // Verifica si el periodId es válido
    if (!periodId || isNaN(periodId)) {
      return res.status(400).json({ error: "ID de período inválido" });
    }

    // Obtiene el periodo académico por el ID 
    const period = await PeriodAcademic.findOne({
      where: {
        ID_PERIOD: periodId,
      },
    });

    if (!period) {
      return res.status(404).json({ error: "Período académico no encontrado" });
    }

    // Obtiene los detalles del periodo académico
    const details = await DetailsPeriod.findAll({
      where: {
        ID_PERIOD: period.ID_PERIOD,
      },
    });

    const periodWithDetails = {
      period,
      details,
    };

    res.json(periodWithDetails);
  } catch (error) {
    console.error("Error al obtener el período académico:", error);
    res.status(500).json({ error: "Error al obtener el período académico" });
  }
};