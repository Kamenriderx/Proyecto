const express = require('express');
const router = express.Router()
const {getCareers, requestChangeCareer, getRequestChangeCareer, responseRequest, cancelledRequest, getMyRequests} = require('../controllers/request.js');
const {checkRolCoordinador} = require('../middlewares/rol.js');
const authMiddleware = require('../middlewares/authentication.js');
const upload = require('../middlewares/uploadFiles.js');




router.get("/listCareers" ,getCareers);
router.get("/listRequestChangeCareer" ,authMiddleware,checkRolCoordinador,getRequestChangeCareer);
router.get("/getMyRequest" ,authMiddleware,getMyRequests);

router.post("/requestChangeCareer",authMiddleware, upload.single("pdfFile") ,requestChangeCareer);
router.put("/responseRequest", authMiddleware,checkRolCoordinador, responseRequest)
router.put("/cancelledRequest", authMiddleware,cancelledRequest)
module.exports = router

