const { DataTypes } = require('sequelize');
const connection = require('../../config/database'); 

const PeriodAcademic = connection.define('PeriodAcademic', {
  ID_PERIOD: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  PERIOD_NAME: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  START_DATE: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  FINISH_DATE: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  STATUS: {
    type: DataTypes.ENUM('Por empezar', 'En curso', 'Finalizado'),
    allowNull: false,
    defaultValue: 'Por empezar',
  },
}, {
  tableName: 'periodAcademic',
  timestamps: false,
});

PeriodAcademic.sync({ force: false })
  .then(() => {
    console.log("Tabla de Periodos Academicos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de personas:", error);
  });


module.exports = PeriodAcademic;