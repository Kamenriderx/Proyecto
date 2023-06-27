const { DataTypes } = require('sequelize');
const connection = require("../../config/database");

const Role = connection.define('Role', {
  ID_ROLE: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ROLE_NAME: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  DESCRIPTION: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
}, {
  tableName: 'ROLE',
  timestamps: false,
});

module.exports = Role;