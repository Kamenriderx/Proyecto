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
      PREREGISTRATION_START_DATE: detailsStartDate.toDate(),
      PREREGISTRATION_END_DATE: detailsEndDate.toDate(),
      REGISTRATION_START_DATE: moment.utc(startDate).add(2, "days").toDate(),
      REGISTRATION_END_DATE: moment.utc(startDate).add(7, "days").toDate(),
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
      NOTE_UPLOAD_START_DATE: moment.utc(startDate).add(82, "days").toDate(),
      NOTE_UPLOAD_END_DATE: moment.utc(startDate).add(87, "days").toDate(),
      NOTES_UPLOAD_REGISTRATION_START_DATE: moment
        .utc(startDate)
        .add(88, "days")
        .toDate(),
      NOTES_UPLOAD_REGISTRATION_END_DATE: moment
        .utc(startDate)
        .add(89, "days")
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

    // Verificar si el ID del período es válido
    if (!periodId || isNaN(periodId)) {
      return res.status(400).json({ error: 'ID de período inválido' });
    }

    // Verificar si el período existe en la base de datos
    const existingPeriod = await PeriodAcademic.findOne({
      where: {
        ID_PERIOD: periodId,
      },
    });

    if (!existingPeriod) {
      return res.status(404).json({ error: 'El período académico no existe' });
    }

    // Verificar si la fecha FINISH_DATE se desea editar y es válida
    if (updatedData.hasOwnProperty('FINISH_DATE')) {
      const newFinishDate = new Date(updatedData.FINISH_DATE);
      const originalFinishDate = new Date(existingPeriod.FINISH_DATE);

      // Verificar que la diferencia entre la nueva fecha y la fecha original sea de hasta 7 días
      const maxAllowedDifference = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos
      const dateDifference = newFinishDate.getTime() - originalFinishDate.getTime();

      if (dateDifference > maxAllowedDifference) {
        return res.status(400).json({ error: 'La nueva fecha FINISH_DATE excede los 7 días permitidos' });
      }
    }

    // Verificar si la fecha REGISTRATION_PAYMENT_END_DATE se desea editar y es válida
    if (updatedData.hasOwnProperty('REGISTRATION_PAYMENT_END_DATE')) {
      const newPaymentEndDate = new Date(updatedData.REGISTRATION_PAYMENT_END_DATE);
      const originalPaymentEndDate = new Date(existingPeriod.REGISTRATION_PAYMENT_END_DATE);

      // Verificar que la diferencia entre la nueva fecha y la fecha original sea de hasta 14 días
      const maxAllowedDifferencePaymentEnd = 14;
      const paymentEndDateDifference = differenceInCalendarDays(newPaymentEndDate, originalPaymentEndDate);

      if (paymentEndDateDifference > maxAllowedDifferencePaymentEnd) {
        return res.status(400).json({ error: 'La nueva fecha REGISTRATION_PAYMENT_END_DATE excede los 14 días permitidos' });
      }
    }

    // Filtrar los campos que se pueden actualizar para evitar que se modifiquen campos no permitidos
    const allowedFields = ['FINISH_DATE', 'PERIOD_NAME', 'STATUS'];
    const filteredData = Object.keys(updatedData).reduce((acc, key) => {
      if (allowedFields.includes(key)) {
        acc[key] = updatedData[key];
      }
      return acc;
    }, {});

    // Actualizar el período académico
    await PeriodAcademic.update(filteredData, {
      where: {
        ID_PERIOD: periodId,
      },
    });

    // Si se desean editar los detalles del período, realizar la actualización correspondiente
    if (updatedData.hasOwnProperty('details')) {
      const detailsData = updatedData.details;

      // Actualizar los detalles del período
      await DetailsPeriod.update(detailsData, {
        where: {
          ID_PERIOD: periodId,
        },
      });
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

