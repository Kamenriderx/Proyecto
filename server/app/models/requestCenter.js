const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const RequestCenter = connection.define(
    "REQUEST_CENTER",
    {
        ID_REQUEST_CENTER:{
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

        
        CENTER:{
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
        tableName:'REQUEST_CENTER',
        timestamps: true,  
    }
);


RequestCenter.sync({ force: false })
  .then(() => {
    console.log("Tabla de Solicitudes sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Solicitudes:", error);
});

module.exports = RequestCenter

