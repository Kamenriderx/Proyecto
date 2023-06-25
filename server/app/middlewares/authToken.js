const jwt = require('jsonwebtoken');
require("dotenv").config();

const authToken = async (req, res,next) => {
    try {
        const  token  = req.headers.authorization?.split(' ').pop()|| req.params.token; 
        if(token){
            
            jwt.verify(token, process.env.HASHPASS, async function (err, decoded) {
                if(err){
                    next(err);
                }else{
                    req.token = decoded;
                    next();              
                }
            });
        }else{
            return res.status(404).json({ message: 'No se proporcionó un token de autenticación' });
        }

    } catch (err) {
        next(err);
    }

}

module.exports = authToken;