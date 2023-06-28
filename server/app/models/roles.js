const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Rol = connection.define(
    "ROLE",
    {
        ID_ROLE:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        ROLE_NAME:{
            type:DataTypes.STRING
        }, 
        DESCRIPTION:{
            type:DataTypes.STRING
        }

    },
    {
        tableName:'ROLE',
        timestamps: false,  
    }
);


Rol.sync({ force: false })
  .then(() => {
    console.log("Tabla de ROLES sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de ROLES:", error);
  });




module.exports = Rol;
