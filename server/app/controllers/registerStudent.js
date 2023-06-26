const {Student,User} = require("../models");
const {verifyDataArray} = require("../handlers/handleData");
const {generateEmail} = require("../handlers/handleGenerate");
const {encrypt,generatePassword} = require("../../utils/handlePassword");
const sendMail = require("../../utils/sendMail");
const fechaActual = new Date().toLocaleDateString();

const registerStudentsCtrl = async (req,res)=>{

    try {
       
        let {dataError,dataValidate} = verifyDataArray(req.body.data1);
        dataValidate = mailAssignment(dataValidate);
        save(dataValidate);
        
        
        if(dataError.length>0){
            res.json({messagge:"DATA_CON_ERRORES",error:dataError})
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
        let name = student[0]
        let institutionalEmail = generateEmail(name);
        

        student.push(institutionalEmail)
        student.push(generatePassword())
        return student

    })
}


async function save(data){
    data.map(async (studentArray)=>{
        
        const student={
            NAME:studentArray[0],
            DNI:studentArray[1],
            CAREER:studentArray[2],
            INSTITUTIONAL_EMAIL:studentArray[6],
            CENTER: studentArray[5],
            ROLE: 1,
            EMAIL:studentArray[4],
            USER_PASSWORD_PLAIN:studentArray[7]

        };
        student.USER_PASSWORD=await encrypt(student.USER_PASSWORD_PLAIN);
        await Student.inserStudent(student);

        const result = await User.findOne({where:{
            EMAIL:student.EMAIL
        }});

        const ACCOUNT_NUMBER= result.dataValues.ACCOUNT_NUMBER

        sendMail(student.EMAIL, {subject: "Nuevo usuario creado"},"sendMailStudent", {
            name: student.NAME,
            email: student. INSTITUTIONAL_EMAIL,
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
