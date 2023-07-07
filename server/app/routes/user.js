const express = require('express');
const router = express.Router()
const {getStudents,getPerfil, updateEmail,uploadPhotos, deleteMultimedia, uploadVideo} = require("../controllers/user");
const authMiddleware = require('../middlewares/authentication');
const upload = require('../middlewares/upload');
const uploadVideoMiddleware = require('../middlewares/uploadVideo');

router.get("/getStudents",authMiddleware,getStudents);



router.get("/getPerfil/:id",authMiddleware,getPerfil);
router.put("/updateEmail/:id",authMiddleware,updateEmail);
router.put('/uploadPhotos/:id',authMiddleware ,upload.array('files'), uploadPhotos );
router.delete("/deleteMultimedia/:id", authMiddleware,deleteMultimedia)
router.put('/uploadVideo/:id',authMiddleware ,uploadVideoMiddleware.single("file"), uploadVideo);










module.exports = router
