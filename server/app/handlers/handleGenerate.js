const {faker } = require("@faker-js/faker");
const crypto = require('crypto');




const generateEmail = function (name, n=1) {
    let email = '';

    let fullName = getName(name);
    email = faker.internet.email({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        provider: (n == 1) ? "unah.hn":"unah.edu.hn"
    })    



    
    

    return email; // Elimina el espacio en blanco al final de la cadena
}
  
function getName(name){
    let words = {}
    const length = name.split(" ").length
    if(length>2){
        words.firstName= name.split(" ")[0].toLowerCase().replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u");
        words.lastName =name.split(" ")[2].toLowerCase().replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u");
        return words
        
    }

    if (length == 2) {
        words.firstName= name.split(" ")[0].toLowerCase().replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u");
        words.lastName =name.split(" ")[1].toLowerCase().replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u");
        return words
        
    }
}


function generateRandomCaracters(longitud) {
    const caracteres = '0123456789';
    let word = '';
  
    for (let i = 0; i < longitud; i++) {
      const index = crypto.randomInt(0, caracteres.length);
      word += caracteres.charAt(index);
    }
  
    return word;
}

  
module.exports = {
    generateEmail, 
    generateRandomCaracters
};
