const jwt = require("jsonwebtoken");
const USER = require("../models/user");
require("dotenv").config();

const handleConnection = async (socket, data) => {
  return new Promise((resolve, reject) => {
    jwt.verify(data.token, process.env.HASHPASS, async function (err, decoded) {
      if (err) {
        console.log(err);
        reject(err); 
      } else {
        try {
          const token = decoded;
          const user = await USER.findOne({ ID_USER: token.ID_USER });
          user.ONLINE_STATUS = data.status;
          await user.save();

          if(data.status === "offline"){
            delete data.activeConnections[token.ID_USER];
          }else{
            data.activeConnections[token.ID_USER] = {
              socketId: socket.id,
              status: data.status,
              token: data.token,
            };
          }
          
          resolve( data.activeConnections);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      }
    });
  });
};

module.exports = handleConnection;
