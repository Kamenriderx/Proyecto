const {User, Career} =require("../models");
const {Op} = require('sequelize');
const verifyData = async (data)=>{
    const dataError=[];
    const dataValidate =[];

    await Promise.all(data.map(async (student)=>{
        let error = {
            NAME:"",
            DNI:"",
            CARRER:"",
            EMAIL:"",
            CENTER:""

        }

        
 
        
        if (!student.hasOwnProperty('NAME')) {
            error.NAME+=`La columna nombre no existe\n`;
        }

        
        if ( typeof student.NAME !== 'string' ) {
            error.NAME+=`El tipo de la columna nombre dato no es el correcto, debe ser cadena de caracteres\n`;
        }
        if ( typeof student.NAME == 'string' ) {
            if (student.NAME.split(" ").length <2) {
                error.NAME+=`El estudiante debe tener mas de un nombre\n`;                    
            }    
            if ( student.NAME.trim()==="") {
                error.NAME+=`El nombre campo está vacío\n`;
            }
        }

        if (!student.hasOwnProperty('DNI')) {
            error.DNI+=`La columna DNI no existe\n`;
        }

        if ( typeof student.DNI !== 'string') {
            error.DNI+=`El tipo de dato de la columna DNI no es el correcto, debe ser una cadena de caracteres\n`;
            
        }
        if ( typeof student.DNI == 'string') {
            
            if (!(/^[0-9]{4}-[0-9]{4}-[0-9]{5}$/.test(student.DNI)))  {
                if (student.DNI.length != 13 ) {
                    error.DNI +=`El DNI debe seguir el siguiente patrón 0000-0000-00000\n` 
                }
                if ( typeof parseInt(student.DNI) !== "number") {
                    error.DNI +=`El DNI debe de ser un valor númerico o una cadena de caracteres con el siguiente patrón 0000-0000-00000\n`
            
            
                }
            }
    
            if ((student.DNI.replace(/-/g, "").length != 13) ) {
                error.DNI +=`El DNI debe tener 13 digitos\n`
            }
            if (student.DNI.trim()==="") {
                error.DNI+=`El campo DNI está vacío\n`;
                
            }
            
        }

        if (!student.hasOwnProperty('CARRER') ) {
            error.CARRER+=`La columna carrera no existe\n`;
        }

        if (typeof student.CARRER == 'string') {
            if (student.CARRER.trim()==="") {
                error.CARRER+=`El campo carrera está vació\n`;
                
            }
            let career = await Career.findOne({
                where:{
                    NAME: {[Op.like]:student.CARRER}
                }
            })
    
            if (!career) {
                error.CARRER += "El nombre de la carrera no es válido\n"
                
            }
        }


        if (typeof student.CARRER !== 'string') {
            error.CARRER+=`EL tipo de dato del campo carrera no es el correcto, deber ser una cadena de caracteres\n`;
        }

        
        if (!student.hasOwnProperty('CENTER') ) {
            error.CENTER+=`La columna centro no existe\n`;
        }

        if (typeof student.CENTER == 'string') {
            if (student.CENTER.includes("\r")) {
                student.CENTER= student.CENTER.slice(0,-1) 
                
            }
    
            if (student.CENTER.trim()==="") {
                error.CENTER+=`El campo centro está vacío\n`;
                
            }
           
            if (student.CENTER !="Ciudad Universitaria" && student.CENTER !="Centro Universitario Regional Del Centro" && student.CENTER != "Centro Universitario Regional de Litoral Atlántico" && student.CENTER !="Centro Universitario Regional del Litoral Pacífico" && student.CENTER !="UNAH Valle de Sula" && student.CENTER !="Universidad Nacional Autónoma de Honduras Valle de Sula" && student.CENTER !="Centro Universitario Regional de Occidente" && "Centro Universitario Regional Nororiental" &&student.CENTER != "Centro Tecnológico de Danlí"&& student.CENTER !="Centro Tecnológico del Valle del Aguán" ) {
                error.CENTER+=`El nombre del centro no es correcto o no existe, los siguientes son nombres válidos:\n1. Ciudad Universitaria\n2. Centro Universitario Regional del Centro\n3. UNAH Valle de Sula\n4. Universidad Nacional Autónoma de Honduras del Valle de Sula\n5. Centro Universitario Regional de Occidente\n6. Centro Universitario Regional Nororiental\n7. Centro Tecnológico de Danlí\n8. Centro Tecnológico del Valle del Aguán\n`;
                
            }
        }
        if (typeof student.CENTER !== 'string') {
            error.CENTER+=`EL tipo de dato de la columna centro no es el correcto, deber ser una cadena de caracteres\n`;
        }

        

        
        if (!student.hasOwnProperty('EMAIL') ) {
            error.CARRER+=`La columna correo no existe\n`;
        }

        if (typeof student.EMAIL == 'string') {
            
            if (student.EMAIL.trim()==="") {
                error.EMAIL+=`El campo correo está vacío\n`;
                
            }
    
        
            if (  !/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(student.EMAIL) ) {
                error.EMAIL+=`EL correo no tiene un formato válido\n`;
            }
        }

        if (typeof student.EMAIL !== "string") {
            error.EMAIL+=`EL tipo de dato del campo correo no es el correcto, deber ser una cadena de caracteres\n`;
            
        }


   

        if ( error.NAME.length>0 || error.DNI.length>0 || error.CARRER.length>0 || error.CENTER.length>0 || error.EMAIL.length>0) {
            student.error = error;

            dataError.push(student);
            return student
        } else {
            student.DNI=student.DNI.replace(/-/g,"")
            dataValidate.push(student);
            return student;
            
        }

            
        


    }));

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
                
                throw new Error("existe");
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
