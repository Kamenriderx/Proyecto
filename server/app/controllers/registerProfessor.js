const {Professor,User} = require("../models");
const {matchedData} = require("express-validator"); 
const {Op} = require('sequelize');
const {encrypt, generatePassword} = require("../../utils/handlePassword");
const sendMail = require("../../utils/sendMail");
const {generateEmail} = require("../handlers/handleGenerate");
const fechaActual = new Date().toLocaleDateString();

const registerProfessorCtrl = async (req,res)=>{
    try {
        const {file} = req;
        const url = `http://localhost:3000/images/${file.filename}`
        const body = matchedData(req);
        body.URL = url


        const profesor  = await User.findOne({where:{
            [Op.or]:[
                {ACCOUNT_NUMBER: body.ACCOUNT_NUMBER},
                {EMAIL: body.EMAIL}

            ]
            
        },include: Professor})

        if(profesor){
            if(profesor.ACCOUNT_NUMBER === body.ACCOUNT_NUMBER){
                res.status(409).json({messagge:"EL NUMERO DE CUENTA YA EXISTE"})
                return 
            }
    
            
            if(profesor.EMAIL === body.EMAIL){
                res.status(409).json({messagge:"EL CORREO DEL USUARIO YA EXISTE"})
                return 
            }

        }


        body.USER_PASSWORD_PLAIN = generatePassword();
        body.USER_PASSWORD = await encrypt(body.USER_PASSWORD_PLAIN);
        await Professor.add(body);
        sendMail(body.EMAIL, {subject: "Registro, Universidad Nacional Autonoma e Honduras"},"sendMailProfessor", {
            name: body.NAME,
            password: body.USER_PASSWORD_PLAIN,
            account_number:body.ACCOUNT_NUMBER,
            fecha: fechaActual,
            email: `${generateEmail(body.NAME).split("@")[0]}@unah.edu.hn`
        });


        





        
        
        res.status(200).json({messagge:"Docente agregado de forma exitosa"});
        
    } catch (error) {
        console.log(error)
        res.status(403).json({error:"ALGO SALIO MAL"})
        
    }

}



module.exports = {
    registerProfessorCtrl
};
