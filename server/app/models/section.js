const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Section = connection.define(
    "SECTION",
    {
        ID_SECTION:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        
        ID_CLASSROOM:{
            type:DataTypes.INTEGER
        },
        ID_PROFFERSSOR:{
            type:DataTypes.INTEGER
        }, 
        ID_COURSE:{
            type:DataTypes.INTEGER
        }, 
        DAYS:{
            type:DataTypes.STRING,
        }, 
        SECTION_CODE:{
            type:DataTypes.STRING

        },
        START_TIME:{
            type:DataTypes.STRING,
        }, 
        END_TIME:{
            type:DataTypes.STRING,
        }, 
        SPACE_AVAILABLE:{
            type:DataTypes.INTEGER,
        }, 
        ID_PERIOD:{
            type:DataTypes.INTEGER,
        }, 
        DELETED:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        }, 
        JUSTIFY:{
            type:DataTypes.TEXT,
            defaultValue: "-"
        }, 
        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
            type:DataTypes.DATE
        },
       
    },
    {
        tableName:'SECTION',
        timestamps: true,  
    }
);


Section.sync({ force: false })
  .then(() => {
    console.log("Tabla de Secciones sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Secciones:", error);
});

module.exports = Section

