const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const ServiceCourse = connection.define(
    "SERVICE_COURSE",
    {
        ID_SERVICE:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        
        ID_COURSE:{
            type:DataTypes.INTEGER,
          
        },

        ID_CAREER:{
            type:DataTypes.INTEGER,
           
        },




    },
    {
        tableName:'SERVICE_COURSE',
        timestamps: false,  
    }
);


ServiceCourse.sync({ force: false })
  .then(() => {
    console.log("Tabla de ROLES sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de ROLES:", error);
  });




module.exports = ServiceCourse;
