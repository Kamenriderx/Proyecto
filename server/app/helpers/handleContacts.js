const jwt = require("jsonwebtoken");
const USER = require("../models/user");
const Contacts = require("../models/contacts");
const { Op } = require("sequelize");
require("dotenv").config();

const activeConnections = {};
const handleConnection = async (socket, data) => {
  try {
    const friendships = await Contacts.findAll({
      attributes: ["USER_ID", "CONTACT_ID"],
      where: {
        [Op.or]: [{ USER_ID: 1 }, { CONTACT_ID: 1 }],
      },
    });
    const IdFriendships = friendships.map(
      (contact) => contact.dataValues.CONTACT_ID
    );
    const users = await USER.findAll({
      where: {
        ONLINE_STATUS: "online",
        ID_USER: {
          [Op.in]: IdFriendships,
        },
      },
    });


    users.map((user) => {
        return {
          ID_USER: user.dataValues.ID_USER,
          ACCOUNT_NUMBER: user.dataValues.ACCOUNT_NUMBER,
          NAME: user.dataValues.NAME,
        };
      })

    
  } catch (e) {}
};

module.exports = handleConnection;
