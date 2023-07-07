const handleConnection = require("../helpers/handleConnection");
require("dotenv").config();

let activeConnections = {};
const handleConnections = (io) => {
  io.on("connection", (socket) => {
    console.log("new Connection");
    token = socket.handshake.query.token;

    handleConnection(socket,{token,status:"online",activeConnections}).then((connections)=>{
      activeConnections = {...connections};
      console.log(activeConnections);
      //console.log("Esta es la conexion: ",io.sockets.sockets);
    });
   
    socket.emit("connection", { message: "Te has conectado!" });


    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      handleConnection(socket, { token, status: "offline" ,activeConnections}).then((connections)=>{
        activeConnections = {...connections};
        console.log("Se desconecto un usuario:",activeConnections);
        //console.log("Esta es la conexion: ",io.sockets.sockets);
      });;
    });
  });
};

module.exports = handleConnections;
