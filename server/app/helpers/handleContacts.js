const jwt = require("jsonwebtoken");
const USER = require("../models/user");
const Contacts = require("../models/contacts");
const { Op } = require("sequelize");
const Student = require("../models/student");
const Multimedia = require("../models/multimedia");
require("dotenv").config();

const handleContacts = async (data) => {
  return new Promise((resolve, reject) => {
    jwt.verify(data.token, process.env.HASHPASS, async function (err, decoded) {
      try {
        const friendships = await Contacts.findAll({
          attributes: ["USER_ID", "CONTACT_ID"],
          where: {
            [Op.or]: [
              { USER_ID: decoded.userId },
              { CONTACT_ID: decoded.userId },
            ],
          },
        });
        const idFriends = friendships.map((friendShip) =>
          friendShip.dataValues.USER_ID === decoded.userId
            ? friendShip.dataValues.CONTACT_ID
            : friendShip.dataValues.USER_ID
        );

        const users = await USER.findAll({
          where: {
            ID_USER: {
              [Op.in]: idFriends,
            },
          },
          include: [
            {
              model: Multimedia, 
              as: "multimedia",
              where:{
                IS_PROFILE:1
              },
              required: false,
            }
          ],

        });
        const arrUsers = users.map((user) => {
          return {
            ID_USER: user.dataValues.ID_USER,
            ACCOUNT_NUMBER: user.dataValues.ACCOUNT_NUMBER,
            NAME: user.dataValues.NAME,
            ONLINE_STATUS: user.dataValues.ONLINE_STATUS,
            PROFILE_PHOTO:user.dataValues.multimedia[0]?.dataValues.URL||""
          };
        });
        resolve({ arrUsers, ownerList: decoded.userId });
      } catch (e) {
        console.log(e);
      }
    });
  });
};

module.exports = handleContacts;
