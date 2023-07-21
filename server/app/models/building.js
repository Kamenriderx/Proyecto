const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Building = connection.define(
    "BUILDING",
    {
        ID_BUILDING:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        NAME:{
            type:DataTypes.STRING
        },
        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
            type:DataTypes.DATE
        },
       
    },
    {
        tableName:'BUILDING',
        timestamps: true,  
    }
);


Building.sync({ force: false })
  .then(() => {
    console.log("Tabla de Edificios sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Edificios:", error);
});

module.exports = Building

