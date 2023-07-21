const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Classroom = connection.define(
    "CLASSROOM",
    {
        ID_CLASSROOM:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        
        NUMBER:{
            type:DataTypes.INTEGER
        },
        ID_BUILDING:{
            type:DataTypes.INTEGER
        },
        AMOUNT_PEOPLE:{
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
        tableName:'CLASSROOM',
        timestamps: true,  
    }
);


Classroom.sync({ force: false })
  .then(() => {
    console.log("Tabla de Aulas sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Aulas:", error);
});

module.exports = Classroom

