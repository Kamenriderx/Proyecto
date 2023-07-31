const multer = require('multer');

const fileFilter = (req, file, cb) => {
  // Comprueba si el archivo cumple con los criterios deseados
  if (file.mimetype === 'application/pdf') {
    // Acepta el archivo
    req.messagge = "El archivo es válido";
    cb(null, true);
  } else {
    // Rechaza el archivo
    req.messagge = "El archivo no es válido";
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: function(req, filename, cb) {
    const pathStorage = `public/docs`
    cb(null, pathStorage)
  },
  filename: function(req, filename, cb) {
      const ACCOUNT_NUMBER = req.user.ACCOUNT_NUMBER; 

      
      const ext = filename.originalname.split(".").pop();
      const File = `file-${ACCOUNT_NUMBER}-${Date.now()}.${ext}`;
      cb(null, File)
        
     
  }
});

const upload = multer({ storage: storage, fileFilter:fileFilter });

module.exports = upload;