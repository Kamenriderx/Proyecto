const { DataTypes } = require("sequelize");
const connection = require("../../config/database");

const Admin = connection.define(
    "admins",
    {


    },
    {
        
    }
);


module.exports = Admin;
