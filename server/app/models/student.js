const { DataTypes } = require("sequelize");
const connection = require("../../config/database");
const User = require('./user.js');
const Student = connection.define(
    "STUDENT",
    {
        ID_STUDENT:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        ID_USER:{
            type:DataTypes.INTEGER
        
        },
        YEAR_OF_INCOME:{
            type: DataTypes.DATE
        },

        STATE:{
            type:DataTypes.TEXT
        },

        INSTITUTIONAL_EMAIL:{
            type:DataTypes.STRING
        },
        
        CAREER:{
            type:DataTypes.STRING
        }



    },
    {
        tableName:'STUDENT',
        timestamps: false,

    }
);

User.hasMany(Student,{
    foreignKey:"ID_USER"
});
Student.belongsTo(User,{
    foreignKey:"ID_USER"
})

Student.inserStudent = async function(student){
    return await connection.query('CALL sp_createstudent(:ROLE, :NAME, :DNI, :CENTER, :EMAIL, :CAREER,:INSTITUTIONAL_EMAIL,:USER_PASSWORD)', {
        replacements: {
          ROLE: student.ROLE, // Valor para el parámetro "role"
          NAME: student.NAME, // Valor para el parámetro "name"
          DNI: student.DNI, // Valor para el parámetro "dni"
          CENTER: student.CENTER, // Valor para el parámetro "center"
          EMAIL: student.EMAIL, // Valor para el parámetro "email"
          CAREER: student.CAREER, // Valor para el parámetro "career"
          INSTITUTIONAL_EMAIL: student.INSTITUTIONAL_EMAIL,
          USER_PASSWORD: student.USER_PASSWORD
        }
    });
}




Student.sync({ force: false })
  .then(() => {
    console.log("Tabla de ESTUDIANTES sincronizada");
})
  .catch((error) => {
    console.error("Error al sincronizar tabla de ESTUDIANTES:", error);
});



module.exports = Student;
