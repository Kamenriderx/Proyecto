const { DataTypes } = require("sequelize");
const connection = require("../../config/database");
const User = require("./user");

const Contact = connection.define('Contact', {
    ID_CONTACT: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'ID_USER'
      }
    },
    CONTACT_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'ID_USER'
      }
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
    tableName: 'contacts',
    timestamps: false, 
  });
  
  Contact.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  Contact.belongsTo(User, { foreignKey: 'contact_id', as: 'contact' });
  
  module.exports = Contact;