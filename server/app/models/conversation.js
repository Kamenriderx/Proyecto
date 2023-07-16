const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Conversation = connection.define(
    "CONVERSATION",
    {
        ID_CONVERSATION:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        USER_1_ID:{
            type:DataTypes.INTEGER
        },
        USER_2_ID:{
            type:DataTypes.INTEGER
        },
        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
            type:DataTypes.DATE
        },
        STATE:{
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        USER_N_MESSAGE:{
            type:DataTypes.INTEGER,
          
        }

       

        

       
    },
    {
        tableName:'CONVERSATION',
        timestamps: true,  
    }
);


Conversation.sync({ force: false })
  .then(() => {
    console.log("Tabla de Conversaciones sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Conversaciones:", error);
});

module.exports = Conversation

