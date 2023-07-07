const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Multimedia = connection.define(
    "MULTIMEDIA",
    {
        ID_MULTIMEDIA:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        ID_USER:{
            type:DataTypes.INTEGER
        }, 
        URL:{
            type:DataTypes.TEXT
        },
        IS_PROFILE:{
          type:DataTypes.INTEGER
        }

    },
    {
        tableName:'MULTIMEDIA',
        timestamps: false,  
    }
);


Multimedia.sync({ force: false })
  .then(() => {
    console.log("Tabla de MULTIMEDIA sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de MULTIMEDIA:", error);
  });




module.exports = Multimedia;
