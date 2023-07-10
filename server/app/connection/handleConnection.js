const handleConnection = require("../helpers/handleConnection");
const handleContacts = require("../helpers/handleContacts");
require("dotenv").config();

let activeConnections = {};
const handleConnections = (io) => {
  
  io.on("connection", (socket) => {
    const token = socket.handshake.query.token;
    
    socket.emit("connection", { message: "Te has conectado!" });
    
    handleConnection(socket,{token,status:"online",activeConnections}).then((connections)=>{
      activeConnections = {...connections};
      handleContacts({ token }).then(res=>{
        res.arrUsers.map(friend=>{
          if(activeConnections[`${friend.ID_USER}`]){
            io.sockets.sockets.get(activeConnections[`${friend.ID_USER}`].socketId).emit("reloadList",{message:"Nuevo amigo conectado",friend:res.ownerList});
          }
        });
        socket.emit("onlineList",{...res});
      });
    });

    socket.on("disconnect", (data) => {
      
      handleConnection(socket, { token, status: "offline" ,activeConnections}).then((connections)=>{
        activeConnections = {...connections};
        handleContacts({ token }).then(res=>{
          res.arrUsers.map(friend=>{
            if(activeConnections[`${friend.ID_USER}`]){
              io.sockets.sockets.get(activeConnections[`${friend.ID_USER}`].socketId).emit("reloadList",{message:"Nuevo amigo conectado",friend:res.ownerList});
            }
          });
        });
      });
    });


    socket.on("sendMessage",(data)=>{
      const user = getUser(data.ID_RECEIVER)
      console.log({recibeMsj: user.socketId})
      io.to(user.socketId).emit("getMessage",{
        ID_SENDER:data.ID_SENDER,
        CONTENT:data.TEXT
      });      

    })
  
  });
};


// obtener usuario en linea
const getUser = (id)=>{
  return activeConnections[id]
}
module.exports = handleConnections;
