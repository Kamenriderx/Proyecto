const {Student,User} = require("../models");
const {verifyData} = require("../handlers/handleData");
const {generateEmail} = require("../handlers/handleGenerate");
const {encrypt,generatePassword} = require("../../utils/handlePassword");
const sendMail = require("../../utils/sendMail");
const fechaActual = new Date().toLocaleDateString();

const registerStudentsCtrl = async (req,res)=>{
    try {
        // console.log(req.body)
       
        let {dataError,dataValidate} = verifyData(req.body);
        dataValidate = mailAssignment(dataValidate);
        save(dataValidate);
        
        
        if(dataError.length>0){
            res.status(406).json({messagge:"DATA_CON_ERRORES",error:dataError})
            return 
        }


        res.status(200).json({messagge:"TODO_CORRECTO"})
    } catch (error) {
        console.log(error);
        res.status(403).send({msj:"ERROR_UPLOAD_DATA"})
        
    }
}

function mailAssignment(dataValidate){
    return dataValidate.map((student)=>{
        let name = student.NAME
        let institutionalEmail = generateEmail(name);
        
        student.INSTITUTIONAL_EMAIL = institutionalEmail
        student.USER_PASSWORD_PLAIN = generatePassword()
        return student

    })
}


async function save(data){
    data.map(async (studentArray)=>{
        
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
        student.USER_PASSWORD=await encrypt(student.USER_PASSWORD_PLAIN);
        await Student.inserStudent(student);

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

        return student

    });

    return data

}

module.exports = {
    registerStudentsCtrl
};
