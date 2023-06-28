const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Person_ = connection.define(
  "Person_",
  {
    ID_Person_: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    P_NAME: {
      type: DataTypes.STRING,
    },
    P_MAIL: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName:'Person_',
    timestamps: false,
  }
);

Person_.sync({ force: false })
  .then(() => {
    console.log("Tabla de personas sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de personas:", error);
  });

module.exports = Person_;
