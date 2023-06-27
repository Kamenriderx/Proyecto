
const crypto = require('crypto');




const generateEmail = function (name) {
    let longitud = 2;
    let email = '';

    let words = fillArray(name);


    for (let i = 0; i < longitud; i++) {
      let index = crypto.randomInt(0, words.length);
      
        if(email.includes(words[index]) ){
        index = crypto.randomInt(0, words.length);
        longitud +=1
        }else{
        email += words[index];
        
        
        }
}

    email+=generateRandomCaracters(2)
    email +='@unah.hn'

    return email; // Elimina el espacio en blanco al final de la cadena
}
  
function fillArray(name){
   
    let words = []
    for (let index = 0; index < name.split(" ").length; index++) {
        words.push(name.split(" ")[index]);
        words.push(name.split(" ")[index].split(" ")[0]);
    }
    return words
}


function generateRandomCaracters(longitud) {
    const caracteres = 'ABCDEFGHIJKLMÑOPQRSTUVWXYZ0123456789';
    let word = '';
  
    for (let i = 0; i < longitud; i++) {
      const index = crypto.randomInt(0, caracteres.length);
      word += caracteres.charAt(index);
    }
  
    return word;
}

  
module.exports = {
    generateEmail
};
