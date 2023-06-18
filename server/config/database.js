require("dotenv").config();
const mysql = require("mysql2");

const { Sequelize } = require('sequelize');

const connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql'
});

module.exports = connection;