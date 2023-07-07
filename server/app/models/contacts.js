const { DataTypes } = require("sequelize");
const connection = require("../../config/database");
const { Sequelize } = require('sequelize');
const USER = require("./user");
const Contacts = connection.define(
  "Contacts",
  {
    ID_CONTACT: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    USER_ID : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CONTACT_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    CREATED_AT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    UPDATED_AT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "Contacts",
    timestamps: false,
  }
);

Contact.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Contact.belongsTo(User, { foreignKey: 'contact_id', as: 'contact' });


Contacts.sync({ force: false })
  .then(() => {
    console.log("Tabla de Contactos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de personas:", error);
  });



module.exports = Contacts;
