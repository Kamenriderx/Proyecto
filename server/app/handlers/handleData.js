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
            error.NAME+=`La columna no existe\n`;
        }

        
        if ( typeof student.NAME !== 'string' ) {
            error.NAME+=`El tipo de dato no es el correcto, debe ser cadena de caracteres\n`;
        }
        if ( typeof student.NAME == 'string' ) {
            if (student.NAME.split(" ").length <2) {
                error.NAME+=`El estudiante debe tener mas de un nombre\n`;                    
            }    
            if ( student.NAME.trim()==="") {
                error.NAME+=`El campo está vacío\n`;
            }
        }

        if (!student.hasOwnProperty('DNI')) {
            error.DNI+=`La columna no existe`;
        }

        if ( typeof student.DNI !== 'string') {
            error.DNI+=`El tipo de dato no es el correcto, debe ser una cadena de caracteres\n`;
            
        }
        if ( typeof student.DNI == 'string') {
            
            if (!(/^[0-9]{4}-[0-9]{4}-[0-9]{5}$/.test(student.DNI)))  {
                error.DNI +=`Debe seguir el siguiente patrón 0000-0000-00000\n` 
            }
    
            if ((student.DNI.replace(/-/g, "").length != 13) ) {
                error.DNI +=`Debe tener 13 digitos\n`
            }
            if (student.DNI.trim()==="") {
                error.DNI+=`El campo está vació`;
                
            }
            
        }

        if (!student.hasOwnProperty('CARRER') ) {
            error.CARRER+=`La columna no existe\n`;
        }

        if (typeof student.CARRER == 'string') {
            if (student.CARRER.trim()==="") {
                error.CARRER+=`El campo está vació\n`;
                
            }
            let career = await Career.findOne({
                where:{
                    NAME: {[Op.like]:student.CARRER}
                }
            })
    
            if (!career) {
                error.CARRER += "El nombre de la carrera no es valido"
                
            }
        }


        if (typeof student.CARRER !== 'string') {
            error.CARRER+=`EL tipo de dato no es el correcto, deber ser una cadena de caracteres\n`;
        }

        
        if (!student.hasOwnProperty('CENTER') ) {
            error.CENTER+=`La columna no existe\n`;
        }

        if (typeof student.CENTER == 'string') {
            if (student.CENTER.includes("\r")) {
                student.CENTER= student.CENTER.slice(0,-1) 
                
            }
    
            if (student.CENTER.trim()==="") {
                error.CENTER+=`El campo está vació\n`;
                
            }
           
            if (student.CENTER.toLocaleLowerCase() !="ciudad universitaria" && student.CENTER.toLocaleLowerCase() !="centro universitario regional del centro" && student.CENTER.toLocaleLowerCase() != "Centro Universitario Regional de Litoral Atlántico".toLocaleLowerCase() && student.CENTER.toLocaleLowerCase() !="Centro Universitario Regional del Litoral Pacífico".toLocaleLowerCase() && student.CENTER.toLocaleLowerCase() !="UNAH Valle de Sula".toLocaleLowerCase() && student.CENTER.toLocaleLowerCase() !="Universidad Nacional Autónoma de Honduras Valle de Sula".toLocaleLowerCase() && student.CENTER.toLocaleLowerCase() !="Centro Universitario Regional de Occidente".toLocaleLowerCase() && "Centro Universitario Regional Nororiental".toLocaleLowerCase() &&student.CENTER.toLocaleLowerCase() != "Centro Tecnológico de Danlí".toLocaleLowerCase()&& student.CENTER.toLocaleLowerCase() !="Centro Tecnológico del Valle del Aguán".toLocaleLowerCase() ) {
                error.CENTER+=`
                El nombre del centro no es correcto o no existe, los siguientes son nombres válidos:
                1. Ciudad Universitaria
                2. Centro Universitario Regional del Centro
                3. UNAH Valle de Sula
                4. Universidad Nacional Autónoma de Honduras del Valle de Sula
                5. Centro Universitario Regional de Occidente
                6. Centro Universitario Regional Nororiental
                7. Centro Tecnológico de Danlí
                8. Centro Tecnológico del Valle del Aguán
                (las palabras pueden estár en minúscula o mayúscula totalmente)
                `;
                
            }
        }
        if (typeof student.CENTER !== 'string') {
            error.CENTER+=`EL tipo de dato no es el correcto, deber ser una cadena de caracteres\n`;
        }

        

        
        if (!student.hasOwnProperty('EMAIL') ) {
            error.CARRER+=`La columna no existe\n`;
        }

        if (typeof student.EMAIL == 'string') {
            
            if (student.EMAIL.trim()==="") {
                error.EMAIL+=`El campo está vació\n`;
                
            }
    
        
            if (  !/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(student.EMAIL) ) {
                error.EMAIL+=`EL correo no tiene un formato valido`;
            }
        }

        if (typeof student.EMAIL !== "string") {
            error.EMAIL+=`EL tipo de dato no es el correcto, deber ser una cadena de caracteres\n`;
            
        }


   

        if ( error.NAME.length>0 || error.DNI.length>0 || error.CARRER.length>0 || error.CENTER.length>0 || error.EMAIL.length>0) {
            student.error = error;

            dataError.push(student);
            return student
        } else {

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
