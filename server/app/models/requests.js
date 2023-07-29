const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Request = connection.define(
    "REQUEST",
    {
        ID_REQUEST:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        

        JUSTIFY:{
            type:DataTypes.TEXT,
            defaultValue: "-"
        },
       
        STATE:{
            type:DataTypes.ENUM("Pendiente","Aceptada","Denegada","Cancelada"),
            defaultValue: "Pendiente"
        },
        TYPE:{
            type:DataTypes.ENUM("CARRERA","CENTRO","PAGO_REPO", "CANCELACION_CLASE"),
        },

        OBS:{
            type:DataTypes.TEXT,
            defaultValue: "-"
        },

        CENTER:{
            type:DataTypes.STRING,
        },

        ID_STUDENT:{
            type:DataTypes.INTEGER
        },
        ID_COORDINATOR:{
            type:DataTypes.INTEGER
        },

        ID_PERIOD:{
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
        tableName:'REQUEST',
        timestamps: true,  
    }
);


Request.sync({ force: false })
  .then(() => {
    console.log("Tabla de Solicitudes sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Solicitudes:", error);
});

module.exports = Request

