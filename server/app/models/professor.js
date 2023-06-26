const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Professor = connection.define(
    "professors",
    {


    },
    {

    }
);


module.exports = Professor;
