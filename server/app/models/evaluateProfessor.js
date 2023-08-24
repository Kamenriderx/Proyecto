const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Evaluation = connection.define('Evaluation', {
    ID_EVALUATION: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_PERIOD: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_PROFFERSSOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_COURSE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_SECTION: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_STUDENT: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PROFESSOR_CAREER: {
      type: DataTypes.STRING(255),
    allowNull: false
  },
    RESP_1: DataTypes.TEXT,
    RESP_2: DataTypes.TEXT,
    RESP_3: DataTypes.TEXT,
    RESP_4: DataTypes.TEXT,
    RESP_5: DataTypes.TEXT,
    RESP_6: DataTypes.TEXT,
    RESP_7: DataTypes.TEXT,
    RESP_8: DataTypes.TEXT,
    RESP_9: DataTypes.TEXT,
    RESP_10: DataTypes.TEXT,
    RESP_11: DataTypes.TEXT,
    RESP_12: DataTypes.TEXT,
    RESP_13: DataTypes.TEXT,
    RESP_14: DataTypes.TEXT,
    RESP_15: DataTypes.TEXT,
    RESP_16: DataTypes.TEXT,
    RESP_17: DataTypes.TEXT,
    RESP_18: DataTypes.TEXT,
    RESP_19: DataTypes.TEXT,
    RESP_20: DataTypes.TEXT,
    RESP_21: DataTypes.TEXT,
    RESP_22: DataTypes.TEXT,
    RESP_23: DataTypes.TEXT,
    RESP_24: DataTypes.TEXT,
    RESP_25: DataTypes.TEXT,
    RESP_26: DataTypes.TEXT,
    RESP_27: DataTypes.TEXT,
    RESP_28: DataTypes.TEXT,
    EVALUATED: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
  }, {
    tableName: 'Evaluation', 
    timestamps: false, 
  });
  
Evaluation.sync({ force: false })
  .then(() => {
    console.log("Tabla de Evaluacion sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Evaluacion:", error);
});

module.exports = Evaluation;
