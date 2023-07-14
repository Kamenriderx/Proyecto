const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Message = connection.define(
    "MESSAGE",
    {
        ID_MESSAGE:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        ID_CONVERSATION:{
            type:DataTypes.INTEGER,
         
        },
        // es de quien lo envia
        SENDER_ID:{
            type:DataTypes.INTEGER
        },
        CONTENT:{
            type:DataTypes.TEXT
        },

        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
            type:DataTypes.DATE
        },
        STATE:{
            type:DataTypes.ENUM(["received","seen","sent"]),
            defaultValue:"received"
        }


       
    },
    {
        tableName:'MESSAGE',
        timestamps: true,  
    }
);

Message.connection = connection
Message.sync({ force: false })
  .then(() => {
    console.log("Tabla de Mensajes sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Mensajes:", error);
});

module.exports = Message

