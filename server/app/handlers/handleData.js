const {User} =require("../models");
const {Op} = require('sequelize');
const verifyData = (data)=>{
    const dataError=[];
    const dataValidate =[];

    data.map(async (student)=>{
        let error = ""
        try {

            
            if (!student.hasOwnProperty('NAME')|| student.NAME.length <2 || typeof student.NAME !== 'string' || student.NAME.trim()==="") {
                error+=`Campo NAME invalido: ${student.NAME}, `;
            }
            if (!student.hasOwnProperty('DNI') || typeof student.DNI !== 'string' || student.DNI.length != 13) {
                error+=`Campo DNI invalido: ${student.DNI}, `;
            }
            if (!student.hasOwnProperty('CARRER') || typeof student.CARRER !== 'string' || student.CARRER.trim()==="") {
                error+=`Campo CARRER invalido: ${student.CARRER}, `;
            }
           
            if (!student.hasOwnProperty('CENTER') || typeof student.CENTER !== 'string'|| student.CENTER.trim()==="" || student.CENTER.split(" ").length < 2) {
                error+=`Campo invalido: ${student.CENTER}, `;
            }
        
            if ( !student.hasOwnProperty('EMAIL')|| typeof student.EMAIL !== 'string'  || student.EMAIL.trim()==="" || !/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(student.EMAIL) ) {
                error+=`Campo invalido: ${student.EMAIL}`;
            }



            if (error.length>0) {
                throw new Error(error)
            } else {
    
                dataValidate.push(student);
                return student;
                
            }

            
        } catch (err) {
            student.error = err.message;
            dataError.push(student);
            return student
        }


    })

    return {dataError,dataValidate}

}
const isDuplicate = async (data)=>{
    const dataDuplicate = [];
    const newDataValidate = [];
    await Promise.all(data.map(async(student)=>{
        try {
            const result = await User.findOne(
                {
                    where:{
                        [Op.or]:[
                            {DNI: student.DNI},
                            {EMAIL: student.EMAIL}
                        
                        ]
                    }
                });

            if (!result) {
                newDataValidate.push(student)
                return student 
                    
            }else{
                
                throw new Error("EL USUARIO YA ESTA REGISTRADO");
            }
                
        } catch (error) {
            student.error = error.message
            dataDuplicate.push(student);
            return student

            
        }

    }))

    

    return {dataDuplicate,newDataValidate}

}

module.exports = {verifyData,isDuplicate}
