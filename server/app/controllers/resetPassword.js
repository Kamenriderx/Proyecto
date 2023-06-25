const sendMail = require("../../utils/sendMail");
const {generateAuthToken} = require("../../utils/authToken");
const generateCode = require("../../utils/generateCode");
const USER = require("../models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await USER.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(err);
  }
};
const restorePassword = async (req, res, next) => {
  try {
    console.log()
    const {ACCOUNT_NUMBER,VERIFICATION_CODE} = req.token;
    const { USER_PASSWORD} = req.body;
    const user = await USER.findOne(
        {where:{ ACCOUNT_NUMBER }}

    );
    if(user.VERIFICATION_CODE == VERIFICATION_CODE){
        user.USER_PASSWORD =  USER_PASSWORD;
        await user.save();
        res.status(200).json({message:"Contraseña cambiada correctamente"});
    }else{
        res.status(500).json({message:"No se ah podido reestablecer la contraseña "});
    }

  } catch (err) {
    next(err);
  }
};

const sendRestoreEmail = async (req, res, next) => {
    const { ACCOUNT_NUMBER } = req.params; 
    const VERIFICATION_CODE = generateCode();
    console.log(ACCOUNT_NUMBER,"  ",VERIFICATION_CODE);
    try {

        const user = await USER.findOne(
            {where:{ ACCOUNT_NUMBER }}
        );
            
        if (!user) {
          return res.status(404).json({ message: "No existe un usuario con ese numero de cuenta" });
        }

        user.VERIFICATION_CODE = VERIFICATION_CODE;
        await user.save();

        const token = generateAuthToken({
            ACCOUNT_NUMBER:user.ACCOUNT_NUMBER,
            VERIFICATION_CODE
        },"5m");

        const options = {
            subject:"Recuperacion de contraseña",
        };
        sendMail(user.EMAIL,options,'resetPassword',{token})
        .then((response)=>{
            res.status(200).json({message:`Se ah enviado un correo de verificacion a ${user.EMAIL}`,data:response.data})
        })
        .catch(error=>{
            res.status(500).json({ error: error.message });
        });

      } catch (error) {
        next(error);
      }
};
module.exports = {
  getUsers,
  sendRestoreEmail,
  restorePassword
};
