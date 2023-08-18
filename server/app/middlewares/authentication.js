const {verifyToken} = require("../handlers/handleJwt.js");
const { getPhotos } = require("../helpers/repositoryRequest.js");
const { User, Multimedia } = require("../models");


const authMiddleware =  async (req,res,next) =>{
    try {

        if (!req.headers.authorization) {
            res.status(401).json({messagge:"NECESITAS INICIAR SESION"})
            return
        }

        // obtencion del token 

        const token = req.headers.authorization.split(" ").pop();
        const dataToken = await verifyToken(token);

        if(!dataToken){
            res.status(401).json({messagge:"NOT_PAYLOAD_DATA"})
            return

        }

        const user = await User.findOne({attributes:["ID_USER","ID_ROLE","ACCOUNT_NUMBER","NAME","DNI","CENTER","EMAIL"],where:{
            ID_USER:dataToken.userId
        }})
        req.user = user.dataValues
        req.user.multimedia = await getPhotos(user.ID_USER)
        next()


        
    } catch (error) {
        console.log(error)
        res.status(401).json({messagge:"NOT_SESSION"})
    }
}

module.exports = authMiddleware