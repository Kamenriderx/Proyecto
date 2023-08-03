const { DataTypes } = require("sequelize");
const connection = require("../../config/database");


const USER = connection.define(
  "USER_",
  {
    ID_USER: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    LAST_CONNECTION: {
      type: DataTypes.DATE,
    },
    ID_ROLE: {
      type: DataTypes.INTEGER,
    },
    USER_PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 500], 
      },
    },

    ACCOUNT_NUMBER: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 30], 
      },
    },
    NAME: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100], 
      },
    },

    DNI: {
      type: DataTypes.STRING,
    },
    CENTER: {
      type: DataTypes.STRING,
      
    },
    EMAIL: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 50], 
      },
    },
    VERIFICATION_CODE: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100], 
      },
    },
    ONLINE_STATUS: {
      type: DataTypes.STRING,

    },
  },
  {
    tableName: "USER_",
    timestamps: false,
  }
);

USER.updateEmail =async function(id,EMAIL){
  connection.query("UPDATE user_ SET EMAIL = :EMAIL WHERE ID_USER= :ID_USER",{
      replacements:{
          EMAIL:EMAIL,
          ID_USER:id
      }
  })
}

USER.connection = connection;

USER.sync({ force: false })
  .then(() => {
    console.log("Tabla de USER sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de USER:", error);
  });


  
module.exports = USER;
