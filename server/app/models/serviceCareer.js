const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const ServiceCareer = connection.define(
    "CAREER_SERVICE",
    {
        ID_CAREER_SERVICE:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        
        ID_CAREER:{
            type:DataTypes.INTEGER,
          
        },

        ID_SERVICED_CAREER:{
            type:DataTypes.INTEGER,
           
        },




    },
    {
        tableName:'CAREER_SERVICE',
        timestamps: false,  
    }
);


ServiceCareer.sync({ force: false })
  .then(() => {
    console.log("Tabla de ROLES sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de ROLES:", error);
  });




module.exports = ServiceCareer;
