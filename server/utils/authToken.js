const jwt = require('jsonwebtoken');
require("dotenv").config();

function generateAuthToken(payload,expiresIn='365d') {
  const token = jwt.sign(payload, process.env.HASHPASS,{expiresIn});
  return token;
}

module.exports={
    generateAuthToken
}