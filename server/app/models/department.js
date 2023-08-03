const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Department = connection.define(
    "DEPARTMENT",
    {
        ID_DEPARTMENT:{
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
        tableName:'DEPARTMENT',
        timestamps: true,  
    }
);


Department.sync({ force: false })
  .then(() => {
    console.log("Tabla de Departamentos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Departamentos:", error);
});

module.exports = Department

