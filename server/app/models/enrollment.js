const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Enrollment = connection.define(
    "ENROLLMENT",
    {
        ID_ENROLLMENT:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        

        OBS:{
            type:DataTypes.ENUM("RPB","ABD","APR","NCP"),
            defaultValue:"NCP"
        },
        CALIFICATION:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        STATE:{
            type:DataTypes.ENUM("En Espera","Matriculada","Eliminada","Cancelada","Finalizada"),
            defaultValue: "Matriculada"
        },
        
        ARRIVAL_NUMBER:{
            type:DataTypes.INTEGER
        },
        
        ID_STUDENT:{
            type:DataTypes.INTEGER
        },
        ID_SECTION:{
            type:DataTypes.INTEGER,
        },
        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
            type:DataTypes.DATE
        },
       
    },
    {
        tableName:'ENROLLMENT',
        timestamps: true,  
    }
);


Enrollment.sync({ force: false })
  .then(() => {
    console.log("Tabla de Matricula sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Matricula:", error);
});

module.exports = Enrollment

