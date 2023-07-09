const handleConnection = require("../helpers/handleConnection");
// const {getUser} = require('../handlers/handlerMessage');
require("dotenv").config();

let activeConnections = {};
const handleConnections = (io) => {
  
  io.on("connection", (socket) => {
    console.log("new Connection");
    token = socket.handshake.query.token;

    handleConnection(socket,{token,status:"online",activeConnections}).then((connections)=>{
      activeConnections = {...connections};
      console.log(activeConnections);
      // console.log("Esta es la conexion: ",io.sockets.sockets);
    });
   
    socket.emit("connection", { message: "Te has conectado!" });

    socket.on("sendMessage",(data)=>{

      const user = getUser(data.ID_RECEIVER)
      console.log({recibeMsj: user.socketId})
      io.to(user.socketId).emit("getMessage",{
        ID_SENDER:data.ID_SENDER,
        CONTENT:data.TEXT
      });      


    })

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      handleConnection(socket, { token, status: "offline" ,activeConnections}).then((connections)=>{
        activeConnections = {...connections};
        console.log("Se desconecto un usuario:",activeConnections);
        //console.log("Esta es la conexion: ",io.sockets.sockets);
      });
    });
  });
};


// obtener usuario en linea
const getUser = (id)=>{
  return activeConnections[id]
}
module.exports = handleConnections;
