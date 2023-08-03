const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = async (tokenJwt)=>{

    try {
        return jwt.verify(tokenJwt,process.env.HASHPASS)
        
    } catch (error) {
        console.log(error)
        return null
    }

}

module.exports = {verifyToken}