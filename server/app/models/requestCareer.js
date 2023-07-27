const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const RequestCareer = connection.define(
    "REQUEST_CAREER",
    {
        ID_REQUEST_CARRER:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        


        URL:{
            type:DataTypes.TEXT
        },


        ID_REQUEST:{
            type:DataTypes.INTEGER
        },

        
        ID_CAREER:{
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
        tableName:'REQUEST_CAREER',
        timestamps: true,  
    }
);


RequestCareer.sync({ force: false })
  .then(() => {
    console.log("Tabla de Solicitudes sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Solicitudes:", error);
});

module.exports = RequestCareer

