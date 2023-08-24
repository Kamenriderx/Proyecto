const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const RequesCancellationExceptional = connection.define(
    "REQUEST_CANCELLATION_EXCEPTIONAL",
    {
        ID_REQUEST_CANCELLATION:{
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

        
        ID_ENROLLMENT:{
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
        tableName:'REQUEST_CANCELLATION_EXCEPTIONAL',
        timestamps: true,  
    }
);


RequesCancellationExceptional.sync({ force: false })
  .then(() => {
    console.log("Tabla de Solicitudes sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Solicitudes:", error);
});

module.exports = RequesCancellationExceptional

