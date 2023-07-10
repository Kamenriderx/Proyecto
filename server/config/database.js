require("dotenv").config();
const mysql = require("mysql2");
const { createLogger, format, transports } = require('winston');
const { Sequelize } = require('sequelize');

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message}) => {
          return `${level}: ${message}`;
        })
      ),
    }),
  ],
});

const sequelizeOptions = {
  logging: false
  logging:false
};


const connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
  ...sequelizeOptions
});

module.exports = connection;