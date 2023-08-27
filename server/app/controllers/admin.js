const {Rol, User, Professor, Student} = require('../models');
const {matchedData} = require("express-validator"); 
const {Op, where} = require('sequelize');
const {encrypt, generatePassword} = require("../../utils/handlePassword");
const {verifyData, isDuplicate} = require("../handlers/handleData");
const {generateEmail, generateRandomCaracters} = require("../handlers/handleGenerate");
const sendMail = require("../../utils/sendMail");
const fechaActual = new Date().toLocaleDateString();





const getProfessorsCtrl = async(req,res)=>{

    try {
        const {idUser}= req.params;
        const user = await User.findOne({
            where:{ID_USER:idUser}
        })
        const professors = await Professor.findAll({
            include:{
        
                model:User ,as:"user" ,where:{CENTER:{[Op.like]:user.CENTER}},include:[{model:Rol,as:"rol"}]
            }})
        res.status(200).json({professors})
    } catch (error) {
        console.log(error)
        res.status(403).json({error})
    }
}






const registerProfessorCtrl = async (req,res)=>{
    try {
        
        const {file} = req;
        if (file) {
            const url = `http://localhost:3000/images/${file.filename}`
            body.URL = url
        }
        const body = matchedData(req);
        body.URL = ""

        if (!/^[A-Z][a-z]*\s[A-Z][a-z]*(?:\s[A-Z][a-z]*)*(?:\s[A-Z][a-z]*)*$/.test(body.NAME)) {
            res.status(400).json({messagge:"El nombre del docente es incorrecto, debe de tener la primera letra en mayúscula de cada nombre y apellido"})
            return
            
        }
        if(body.NAME.split(" ").length == 1){
            res.status(401).json({messagge:"El nombre es incorrecto"})
        }

        let ACCOUNT_NUMBER = generateRandomCaracters(5)

        let profesor  = await User.findOne({where:{
            [Op.or]:[
                {ACCOUNT_NUMBER: ACCOUNT_NUMBER},
                {EMAIL: body.EMAIL}

            ]
            
        },include: Professor})
        if(profesor){
            
            if(profesor.EMAIL === body.EMAIL){
                res.status(409).json({messagge:"El correo del usuario ya existe"})
                return 
            }

            ACCOUNT_NUMBER = (profesor.ACCOUNT_NUMBER== ACCOUNT_NUMBER) ? parseInt(profesor.ACCOUNT_NUMBER) +1: ACCOUNT_NUMBER;
            
        }
        if (body.ROLE != 2) {
            
            profesor = await Professor.findOne({
                where:{
                    CAREER: {[Op.like]:body.CAREER}
                }, include:[
                    {
                        model:User, as:"user", where:{
                            [Op.and]:[
                                { CENTER: {[Op.like]:body.CENTER}},
                                { ID_ROLE: body.ROLE},
                            ]
                        }
                    }
                ]
            })

            if (body.ROLE == 3 && profesor) {
                res.status(400).json({messagge:  `Ya existe un jefe de departamento para la carrera de ${body.CAREER} en el centro ${body.CENTER}`})
                return                
            }
            if (profesor && body.ROLE == 4) {
                res.status(400).json({messagge:  `Ya existe un coordinador para la carrera de ${body.CAREER} en el centro ${body.CENTER}`})
                return                
            }
        }



        body.INSTITUTIONAL_EMAIL = generateEmail(body.NAME,2 )

        
            
        body.USER_PASSWORD_PLAIN = generatePassword();
        body.USER_PASSWORD = await encrypt(body.USER_PASSWORD_PLAIN);
        body.ACCOUNT_NUMBER = ACCOUNT_NUMBER
        await Professor.add(body);
        sendMail(body.EMAIL, {subject: "Registro, Universidad Nacional Autonoma de Honduras"},"sendMailProfessor", {
            name: body.NAME,
            password: body.USER_PASSWORD_PLAIN,
            account_number:body.ACCOUNT_NUMBER,
            fecha: fechaActual,
            email:body.INSTITUTIONAL_EMAIL
        });
    


        
        
        



        





        
        
        res.status(200).json({messagge:"Docente agregado de forma exitosa"});
        
    } catch (error) {
        console.log(error)
        res.status(403).json({messagge:"Algo salio mal"})
        
    }

}

const deleteProfessor = async(req, res)=>{
    try {
        const {idUser} = req.params
        await User.destroy({where:{ID_USER: idUser }})
        res.status(200).json({messagge:"El docente ha sido eliminado exitosamente"})
        
    } catch (error) {
        console.log({error})
        res.status(500).json({messagge:"Algo salio mal"})
    }
}


const updateProfessor = async (req,res)=>{
    try {
        
        
        const {idUser} = req.params
        console.log({idUser})
        
        const {body} = req;
        if (!/^[A-Z][a-z]*\s[A-Z][a-z]*(?:\s[A-Z][a-z]*)*(?:\s[A-Z][a-z]*)*$/.test(body.NAME)) {
            res.status(400).json({messagge:"El nombre del docente es incorrecto, debe de tener la primera letra en mayúscula de cada nombre y apellido"})
            return
            
        }

        if(body.NAME.split(" ").length == 1){
            res.status(401).json({messagge:"El nombre es incorrecto"})
        }

    
        let profesor  = await User.findOne({where:{
        
                
            EMAIL: body.EMAIL

         
            
        },include: Professor})


        
            
        if(profesor.EMAIL === body.EMAIL && profesor.ID_USER != idUser){
            res.status(409).json({messagge:"El correo del usuario ya existe"})
            return 
        }

            
        
        if (body.ROL != 2 ) {
           
            
            profesor = await Professor.findOne({
                where:{
                    CAREER: {[Op.like]:body.CARRER}
                }, include:[
                    {
                        model:User, as:"user", where:{
                            [Op.and]:[
                                { CENTER: {[Op.like]:body.CENTER}},
                                { ID_ROLE: body.ROL},
                            ]
                        }
                    }
                ]
            })
     
            if (profesor) {
          
                if ( body.ROL == 3 && profesor.ID_USER != idUser) {
                    res.status(400).json({messagge:  `Ya existe un jefe de departamento para la carrera de ${body.CARRER} en el centro ${body.CENTER}`})
                    return                
                }
                if ( body.ROL == 4 && profesor.ID_USER != idUser) {
                    res.status(400).json({messagge:  `Ya existe un coordinador para la carrera de ${body.CARRER} en el centro ${body.CENTER}`})
                    return                
                }
            }

        }

        await Professor.update({
            
             
            CAREER: body.CAREER,
            
            
            
        }, { where:{
            ID_USER:idUser
        }});

        await User.update({
            NAME: body.NAME,
            CENTER: body.CENTER,
            EMAIL: body.EMAIL,
            ID_ROLE : body.ROL
        },{where:{ID_USER:idUser}})

        
        
        res.status(200).json({messagge:"Docente actualizado de forma exitosa"});
        
    } catch (error) {
        console.log(error)
        res.status(403).json({messagge:"Algo salio mal"})
        
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
            res.status(400).json({messagge:"No se ha recibido ningún dato"})
            
        }

    
        
        
        let {dataError,dataValidate} = await  verifyData(req.body);
        let {dataDuplicate,newDataValidate} =  await isDuplicate(dataValidate);
        

        
    
        if (dataDuplicate.length > 0 && newDataValidate.length >0 && dataError.length==0 ) {
            newDataValidate = mailAssignment(newDataValidate);
            newDataValidate = passwordAssignment(newDataValidate);
            newDataValidate= save(newDataValidate);
            sendEmail(newDataValidate);
            res.status(409).json({messagge:"No todos los estudiantes fueron registrados, algunos estudiantes ya habian sido registrados en el sistema",data:dataDuplicate})    
            return
        
        }
    
        if (dataError.length > 0 && newDataValidate.length >0 && dataDuplicate.length==0  ) {
            newDataValidate = mailAssignment(newDataValidate);
            newDataValidate = passwordAssignment(newDataValidate);
            newDataValidate= save(newDataValidate);
            sendEmail(newDataValidate);
            res.status(409).json({messagge:"No todos los Estudiantes fueron registrados, porque la información de algunos estudiantes contiene errores",data:dataError})    
            return
        
        }
    
        if (dataDuplicate.length > 0 && newDataValidate.length >0 && dataError.length >0 ) {
            newDataValidate = mailAssignment(newDataValidate);
            newDataValidate = passwordAssignment(newDataValidate);
            newDataValidate= save(newDataValidate);
            sendEmail(newDataValidate);
            res.status(409).json({messagge:"No todos los estudiantes fueron registrados, porque algunos estudiantes ya habian sido registrados en el sistema y otros tienen errores en su información",data:dataDuplicate.concat(dataError)})    
            return
        
        }
        if (dataDuplicate.length > 0 && newDataValidate.length == 0 && dataError.length >0 ) {
            
            res.status(409).json({messagge:"No se ha registrado ningún estudiante, porque algunos estudiantes tienen errores en su información y otros ya habian sido registrados en el sistema",data:dataDuplicate.concat(dataError)})    
            return
        
        }

        if (dataDuplicate.length > 0 && newDataValidate.length ==0 && dataError.length ==0) {
            res.status(409).json({messagge:"Estos estudiantes ya habian sido registrados en el sistema",data:dataDuplicate})    
            return
        
        }


        if(dataError.length>0 && newDataValidate.length>0 && dataDuplicate ==0){
            newDataValidate = mailAssignment(newDataValidate);
            newDataValidate = passwordAssignment(newDataValidate);
            newDataValidate= save(newDataValidate);
            sendEmail(newDataValidate);
            res.status(406).json({messagge:"No se han registrado todos los estudiantes, porque la información de algunos estudiantes contiene errores",data:dataError})
            return 
        }
        

        if(dataError.length>0 && newDataValidate.length==0 && dataDuplicate.length ==0){            
            res.status(406).json({messagge:"No se ha registrado ningún estudiante, porque su información contiene errores",data:dataError})
            return 
        }
        
        if (newDataValidate.length > 0 && dataError.length ==0 && dataDuplicate ==0 ) {
            
            newDataValidate = mailAssignment(newDataValidate);
            newDataValidate = passwordAssignment(newDataValidate);
            newDataValidate= save(newDataValidate);
            sendEmail(newDataValidate);
            res.status(200).json({messagge:"Los estudiantes se han registrado de forma correcta"})
            return 
        
        }



        
            
        
    } catch (error) {
        console.log(error);
        res.status(403).send({messagge:"Error al cargar los datos"})
        
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
    getProfessorsCtrl,
    registerProfessorCtrl,
    registerStudentsCtrl,
    getStudents,
    updateProfessor,
    deleteProfessor
    
};
