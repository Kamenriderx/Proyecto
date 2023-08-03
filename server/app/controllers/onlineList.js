const handleContacts = require("../helpers/handleContacts");
const Contacts = require("../models/contacts");
const Multimedia = require("../models/multimedia");
const USER = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Op } = require("sequelize");
const getList = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  handleContacts({ token }).then((contacts) => {
    res.status(200).json({ ...contacts });
  });
};
const searchList = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.HASHPASS, async function (err, decoded) {
    try {
      const userName = req.body.userName;
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
          NAME:{
            [Op.substring]: userName,
            }
        },
        include: [
            {
              model: Multimedia,
              as: "multimedia",
              where: {
                IS_PROFILE: 1,
              },
              required: false,
            },
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
      res.status(200).json({ arrUsers, ownerList: decoded.userId });
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports = { getList, searchList };
