const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Course = connection.define(
    "COURSE",
    {
        ID_COURSE:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        CODE_COURSE:{
            type:DataTypes.STRING  
        },

        NAME:{
            type:DataTypes.STRING
        },
        
        ID_CAREER:{
            type:DataTypes.INTEGER
        },
        IS_SERVICE:{
            type:DataTypes.INTEGER
        },

        UV:{
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
        tableName:'COURSE',
        timestamps: true,  
    }
);


Course.sync({ force: false })
  .then(() => {
    console.log("Tabla de Asignaturas sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Asignaturas:", error);
});

module.exports = Course

