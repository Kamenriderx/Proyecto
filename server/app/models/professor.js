const { DataTypes } = require("sequelize");
const connection = require("../../config/database");
const User = require("./user");

const Professor = connection.define(
    "PROFESSORS",
    {
        ID_PROFFERSSOR:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,

        }, 
        ID_USER:{
            type:DataTypes.INTEGER
        },

        DATE_OF_HIRE:{
            type:DataTypes.DATE,

        }, 
        PROFILE_PHOTO:{
            type:DataTypes.TEXT,

        },
        


    },
    {
        tableName:'PROFESSORS',
        timestamps: false,

    }
);

User.hasMany(Professor,{
    foreignKey:"ID_USER"
});
Professor.belongsTo(User,{
    foreignKey:"ID_USER"
})



Professor.sync({ force: true })
  .then(() => {
    console.log("Tabla de PROFESSORS sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de PROFESSORS:", error);
  });



module.exports = Professor;
