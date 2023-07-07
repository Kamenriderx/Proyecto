const { DataTypes } = require("sequelize");
const connection = require("../../config/database");


const Professor = connection.define(
    "PROFESSOR",
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
        CAREER:{
            type:DataTypes.STRING
        },
        INSTITUTIONAL_EMAIL:{
            type:DataTypes.STRING
        }
        


    },
    {
        tableName:'PROFESSOR',
        timestamps: false,

    }
);



Professor.add = function(professor){
    const user = {
        ID_ROLE: professor.ROLE, // Valor para el parámetro "role"
        NAME: professor.NAME, // Valor para el parámetro "dni"
        CENTER: professor.CENTER, // Valor para el parámetro "center"
        EMAIL: professor.EMAIL, // Valor para el parámetro "email"
        USER_PASSWORD: professor.USER_PASSWORD,
        ACCOUNT_NUMBER : professor.ACCOUNT_NUMBER
    }



    return Professor.create({
        PROFILE_PHOTO:professor.URL,
        CAREER:professor.CAREER,
        INSTITUTIONAL_EMAIL: professor.INSTITUTIONAL_EMAIL,
        user
        

    },{include:[Professor.User]})
}

Professor.updateVideo = async function(id,url,isProfile=1){
    
    connection.query("INSERT INTO multimedia(ID_USER,URL,IS_PROFILE) VALUES(:ID_USER,:URL,:IS_PROFILE)",{
        replacements: {
            ID_USER: id,
            URL:url,
            IS_PROFILE:isProfile

        }
    })

}

Professor.sync({ force: false })
  .then(() => {
    console.log("Tabla de PROFESSORS sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de PROFESSORS:", error);
  });



module.exports = Professor;
