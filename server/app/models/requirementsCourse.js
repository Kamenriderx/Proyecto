const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const RequirementsCourse = connection.define(
    "REQUIREMENTS_COURSE",
    {
        ID_REQUIREMENTS_COURSE:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        

        ID_COURSE:{
            type:DataTypes.INTEGER
        },
        REQUIREMENT_ID_COURSE:{
            type:DataTypes.INTEGER
        },
        
        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
            type:DataTypes.DATE
        },
       
    },
    {
        tableName:'REQUIREMENTS_COURSE',
        timestamps: true,  
    }
);


RequirementsCourse.sync({ force: false })
  .then(() => {
    console.log("Tabla de Requerimientos de clase sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Requerimientos de clase:", error);
});

module.exports = RequirementsCourse

