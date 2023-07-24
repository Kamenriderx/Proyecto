const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Career = connection.define(
    "CAREER",
    {
        ID_CAREER:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        

        NAME:{
            type:DataTypes.STRING
        },

        ID_DEPARTMENT:{
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
        tableName:'CAREER',
        timestamps: true,  
    }
);


Career.sync({ force: false })
  .then(() => {
    console.log("Tabla de Carreras sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Carreras:", error);
});

module.exports = Career

