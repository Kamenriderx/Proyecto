const {Rol, User, Professor, Student} = require('../models');
const {matchedData} = require("express-validator"); 
const {Op} = require('sequelize');
const {encrypt, generatePassword} = require("../../utils/handlePassword");
const {verifyData, isDuplicate} = require("../handlers/handleData");
const {generateEmail, generateRandomCaracters} = require("../handlers/handleGenerate");
const sendMail = require("../../utils/sendMail");
const fechaActual = new Date().toLocaleDateString();





const getProfessorsCtrl = async(req,res)=>{

    try {
        const professors = await Professor.findAll({include:{
        model:User ,as:"user" ,include:[{model:Rol,as:"rol"}]}})
        res.status(200).json({professors})
    } catch (error) {
        console.log(error)
        res.status(403).json({error})
    }
}






const registerProfessorCtrl = async (req,res)=>{
    try {
        
        const {file} = req;
        const url = `http://localhost:3000/images/${file.filename}`
        const body = matchedData(req);
        body.URL = url
        if(body.NAME.split(" ").length == 1){
            res.status(401).json({messagge:"EL NOMBRE ES INVALIDO"})
        }

        let ACCOUNT_NUMBER = generateRandomCaracters(5)

        const profesor  = await User.findOne({where:{
            [Op.or]:[
                {ACCOUNT_NUMBER: ACCOUNT_NUMBER},
                {EMAIL: body.EMAIL}

            ]
            
        },include: Professor})
        if(profesor){
            
            if(profesor.EMAIL === body.EMAIL){
                res.status(409).json({messagge:"EL CORREO DEL USUARIO YA EXISTE"})
                return 
            }

            ACCOUNT_NUMBER = (profesor.ACCOUNT_NUMBER== ACCOUNT_NUMBER) ? parseInt(profesor.ACCOUNT_NUMBER) +1: ACCOUNT_NUMBER;
            
        }
        body.INSTITUTIONAL_EMAIL = generateEmail(body.NAME,2 )

        
            
        body.USER_PASSWORD_PLAIN = generatePassword();
        body.USER_PASSWORD = await encrypt(body.USER_PASSWORD_PLAIN);
        body.ACCOUNT_NUMBER = ACCOUNT_NUMBER
        await Professor.add(body);
        sendMail(body.EMAIL, {subject: "Registro, Universidad Nacional Autonoma e Honduras"},"sendMailProfessor", {
            name: body.NAME,
            password: body.USER_PASSWORD_PLAIN,
            account_number:body.ACCOUNT_NUMBER,
            fecha: fechaActual,
            email:body.INSTITUTIONAL_EMAIL
        });
    


        
        
        



        





        
        
        res.status(200).json({messagge:"Docente agregado de forma exitosa"});
        
    } catch (error) {
        console.log(error)
        res.status(403).json({messagge:"ALGO SALIO MAL"})
        
    }

}



const getStudents = async (req,res) =>{
    try{
        const students = await Student.findAll();
        res.status(200).json(students)
    }catch(err){
        res.status(500).json({messagge:"Error al cargar estudiantes"});
    }
}

const registerStudentsCtrl = async (req,res)=>{
    try {
        
        if (req.body.length <= 0) {
            res.status(400).json({messagge:"NO SE HA ENVIADO DATA"})
            
        }
        
        
        let {dataError,dataValidate} = verifyData(req.body);
        let {dataDuplicate,newDataValidate} =  await isDuplicate(dataValidate);
        
    
        if (dataDuplicate.length > 0 && newDataValidate.length >0 && dataError.length >0 ) {
            newDataValidate = mailAssignment(newDataValidate);
            newDataValidate = passwordAssignment(newDataValidate);
            newDataValidate= save(newDataValidate);
            sendEmail(newDataValidate);
            res.status(409).json({messagge:"AlGUNOS REGISTROS ESTAN DUPLICADOS Y OTROS TIENEN ERRORES",data:{duplicados:dataDuplicate,errores:dataError}})    
            return
        
        }
        if (dataDuplicate.length > 0 && newDataValidate.length == 0 && dataError.length >0 ) {
            
            res.status(409).json({messagge:"AlGUNOS REGISTROS ESTAN DUPLICADOS Y OTROS TIENEN ERRORES",data:{duplicados:dataDuplicate,errores:dataError}})    
            return
        
        }

        if (dataDuplicate.length > 0 && newDataValidate.length ==0 && dataError.length ==0) {
            res.status(409).json({messagge:"TODOS LOS REGISTROS ESTAN DUPLICADOS",dataDuplicate})    
            return
        
        }


        if(dataError.length>0 && newDataValidate.length>0 && dataDuplicate ==0){
            newDataValidate = mailAssignment(newDataValidate);
            newDataValidate = passwordAssignment(newDataValidate);
            newDataValidate= save(newDataValidate);
            sendEmail(newDataValidate);
            res.status(406).json({messagge:"ALGUNOS REGISTROS TIENEN ERRORES",data:dataError})
            return 
        }
        

        if(dataError.length>0 && newDataValidate.length==0 && dataDuplicate.length ==0){            
            res.status(406).json({messagge:"TODOS LOS REGISTROS TIENEN ERRORES",data:dataError})
            return 
        }
        
        if (newDataValidate.length > 0 && dataError.length ==0 && dataDuplicate ==0 ) {
            
            newDataValidate = mailAssignment(newDataValidate);
            newDataValidate = passwordAssignment(newDataValidate);
            newDataValidate= save(newDataValidate);
            sendEmail(newDataValidate);
            res.status(200).json({messagge:"TODO_CORRECTO"})
            return 
        
        }



        
            
        
    } catch (error) {
        console.log(error);
        res.status(403).send({messagge:"ERROR_UPLOAD_DATA"})
        
    }
}
function sendEmail(data){
    data.map(async (element)=>{
        const student = await element
        const result = await User.findOne({where:{
            EMAIL:student.EMAIL
        }});

        const ACCOUNT_NUMBER= result.dataValues.ACCOUNT_NUMBER
        sendMail(student.EMAIL, {subject: "Nuevo usuario creado"},"sendMailStudent", {
            name: student.NAME,
            email: student.INSTITUTIONAL_EMAIL,
            password: student.USER_PASSWORD_PLAIN,
            account_number:ACCOUNT_NUMBER,
            fecha: fechaActual,
        });

    })
}

function mailAssignment(dataValidate){
    return dataValidate.map( (student)=>{
        let name = student.NAME
        var institutionalEmail = generateEmail(name);

        const student_ = Student.findOne({
            where:{INSTITUTIONAL_EMAIL:institutionalEmail}
        }).then((result)=>{
            return result
        }).catch((error)=>{console.log(error)})

        if(student_){
            institutionalEmail = institutionalEmail.replace(institutionalEmail.split("@")[0],institutionalEmail.split("@")[0]+`${generateRandomCaracters(2)}`);
            student.INSTITUTIONAL_EMAIL = institutionalEmail
            return student
        }else{
            student.INSTITUTIONAL_EMAIL = institutionalEmail
            return student

        }

    })
}



function passwordAssignment(data){
    return data.map((student)=>{
        
        
        student.USER_PASSWORD_PLAIN=generatePassword();
        return student

    })
}

function save(data){
    return data.map(async (studentArray)=>{
        const student={
            NAME:studentArray.NAME,
            DNI:studentArray.DNI,
            CAREER:studentArray.CARRER,
            INSTITUTIONAL_EMAIL:studentArray.INSTITUTIONAL_EMAIL,
            CENTER: studentArray.CENTER,
            ROLE: 1,
            EMAIL:studentArray.EMAIL,
            USER_PASSWORD_PLAIN:studentArray.USER_PASSWORD_PLAIN

        };
        student.USER_PASSWORD= await encrypt(studentArray.USER_PASSWORD_PLAIN);
        await Student.inserStudent(student);


        return student

    });
}

module.exports = {
};
























module.exports = {
    getProfessorsCtrl,
    registerProfessorCtrl,
    registerStudentsCtrl,
    getStudents
    
};
