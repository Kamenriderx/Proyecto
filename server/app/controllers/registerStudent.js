const {Student,User} = require("../models");
const {verifyData} = require("../handlers/handleData");
const {generateEmail} = require("../handlers/handleGenerate");
const {encrypt,generatePassword} = require("../../utils/handlePassword");
const sendMail = require("../../utils/sendMail");
const fechaActual = new Date().toLocaleDateString();

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
       
        let {dataError,dataValidate} = verifyData(req.body);
        
        if(dataError.length>0){
            dataValidate = mailAssignment(dataValidate);
            dataValidate = passwordAssignment(dataValidate);
            dataValidate= save(dataValidate);
            sendEmail(dataValidate);
            res.status(406).json({messagge:"DATA_CON_ERRORES",error:dataError})
            return 
        }
        
        dataValidate = mailAssignment(dataValidate);
        dataValidate = passwordAssignment(dataValidate);
        dataValidate= save(dataValidate);
        sendEmail(dataValidate);
        res.status(200).json({messagge:"TODO_CORRECTO"})
        
            
        
    } catch (error) {
        console.log(error);
        res.status(403).send({msj:"ERROR_UPLOAD_DATA"})
        
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
            institutionalEmail = generateEmail(name,4);
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
    registerStudentsCtrl,
    getStudents
};
