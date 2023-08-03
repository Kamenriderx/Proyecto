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
          const user = await USER.findOne({where: {ID_USER: token.userId} });
          user.ONLINE_STATUS = data.status;
          await user.save();
          if(data.status === "offline"){
            console.log("Usuario desconectado :", token.userId);
            delete data.activeConnections[token.userId];
          }else{
            data.activeConnections[token.userId] = {
              socketId: socket.id,
              status: data.status,
              token: data.token,
            };
            console.log("Nueva conexion usuario: ",token.userId);
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
