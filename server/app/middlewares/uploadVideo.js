const multer = require('multer');

const fileFilter = (req, file, cb) => {
  // Comprueba si el archivo cumple con los criterios deseados
  if (file.mimetype === 'video/mp4') {
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
    const pathStorage = `public/videos`
    cb(null, pathStorage)
  },
  filename: function(req, filename, cb) {
      const EMAIL =(!req.body.EMAIL) ? req.user.EMAIL : req.body.EMAIL; 

      
      const ext = filename.originalname.split(".").pop();
      const File = `file-${EMAIL.split("@")[0]}-${Date.now()}.${ext}`;
      cb(null, File)
        
     
  }
});

const uploadVideo = multer({ storage: storage, fileFilter:fileFilter });

module.exports = uploadVideo;