const jwt = require('jsonwebtoken');
require("dotenv").config();

function generateAuthToken(payload) {
  const token = jwt.sign(payload, process.env.HASHPASS);
  return token;
}

module.exports={
    generateAuthToken
}