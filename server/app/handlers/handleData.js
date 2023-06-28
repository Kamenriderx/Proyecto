
const verifyData = (data)=>{
    // console.log(data)
    const dataError=[];
    const dataValidate =[];

    data.map((student)=>{
        let error = ""
        try {
            if (!student.hasOwnProperty('NAME')|| student.NAME.length <2 || typeof student.NAME !== 'string' || student.NAME.trim()==="") {
                error+=`Campo NAME invalido: ${student.NAME}, `;
            }
            if (!student.hasOwnProperty('DNI') || typeof student.DNI !== 'string') {
                error+=`Campo DNI invalido: ${student.DNI}, `;
            }
            if (!student.hasOwnProperty('CARRER') || typeof student.CARRER !== 'string' || student.CARRER.trim()==="") {
                error+=`Campo CARRER invalido: ${student.CARRER}, `;
            }
            // if (!student.hasOwnProperty('direccion') || typeof student.direccion !== 'string'  || student.direccion.trim()==="") {
            //     throw new Error(`Campo invalido: ${student.direccion}`);
            // }
            if (!student.hasOwnProperty('CENTER') || typeof student.CENTER !== 'string'|| student.CENTER.trim()==="") {
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


module.exports = {verifyData}

// const verifyDataArray = (data)=>{
//     const dataError=[];
//     const dataValidate =[];

//     data.map((student)=>{
//         try {
//             if ( typeof student[0] !== 'string' || student[0].split(" ").length < 3 || student[0].trim()==="") {
//                 throw new Error(`Campo invalido: ${student[0]}`);
//             }
//             if (typeof student[1] !== 'number' || !Number.isInteger(student[1])) {
//                 throw new Error(`Campo invalido: ${student[1]}`);
//             }
//             if (typeof student[2] !== 'string' || student[2].trim()==="") {
//                 throw new Error(`Campo invalido: ${student[2]}`);
//             }
//             if ( typeof student[3] !== 'string'  || student[3].trim()==="") {
//                 throw new Error(`Campo invalido: ${student[3]}`);
//             }
//             if (  typeof student[4] !== 'string'  || student[4].trim()==="" || !/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(student[4]) ) {
//                 throw new Error(`Campo invalido: ${student[4]}`);
//             }
//             if ( typeof student[5] !== 'string'|| student[5].trim()==="") {
//                 throw new Error(`Campo invalido: ${student[5]}`);
//             }
           

//             dataValidate.push(student);
//             return student;
            
//         } catch (err) {
//             student[6] = err.message;
//             dataError.push(student);
//             return student
//         }


//     })

//     return {dataError,dataValidate}

// }




// module.exports = {
//     verifyDataArray
// };
