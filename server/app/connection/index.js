const handleConnections = require("./handleConnection");

const handlerSockets = (io) =>{
    handleConnections(io);

}

module.exports = handlerSockets;