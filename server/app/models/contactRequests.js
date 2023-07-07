const { DataTypes } = require('sequelize');
const connection = require('../../config/database');
const User = require('./user');

const ContactRequest = connection.define('ContactRequest', {
  ID_CREQUEST: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  SENDER_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  RECIPIENT_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  STATUS: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    allowNull: false,
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  UPDATED_AT: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'contactRequests',
  timestamps: false, 
});

ContactRequest.belongsTo(User, { foreignKey: 'SENDER_ID', as: 'sender' });
ContactRequest.belongsTo(User, { foreignKey: 'RECIPIENT_ID', as: 'recipient' });

ContactRequest.sync({ force: false })
  .then(() => {
    console.log("Tabla de peticion de contacto sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de peticion de contacto:", error);
  });

module.exports = ContactRequest;