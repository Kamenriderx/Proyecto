const { DataTypes } = require('sequelize');
const connection = require('../../config/database'); 
const periodAcademic = require('../models/periodAcademic')

const DetailsPeriod = connection.define('detailsPeriod', {
  ID_PDETAILS: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_PERIOD: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: periodAcademic,
      key: 'ID_PERIOD',
    },
  },
  NOTE_UPLOAD_START_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  NOTE_UPLOAD_END_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  PREREGISTRATION_START_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  PREREGISTRATION_END_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  REGISTRATION_START_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  REGISTRATION_END_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ADD_CANCELLATIONS_START_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ADD_CANCELLATIONS_END_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  CLASS_START_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  CLASS_END_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  NOTES_UPLOAD_REGISTRATION_START_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  NOTES_UPLOAD_REGISTRATION_END_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  REGISTRATION_PAYMENT_START_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  REGISTRATION_PAYMENT_END_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  LABORATORIES_PAYMENT_START_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  LABORATORIES_PAYMENT_END_DATE: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'detailsPeriod',
  timestamps: false,
});

DetailsPeriod.sync({ force: false })
  .then(() => {
    console.log("Tabla de Detalles de Periodos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de personas:", error);
  });

module.exports = DetailsPeriod;